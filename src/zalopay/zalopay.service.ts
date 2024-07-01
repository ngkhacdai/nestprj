import { CheckoutService } from './../checkout/checkout.service';
import { TrustypayService } from './../trustypay/trustypay.service';
import { Inject, Injectable, forwardRef } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';
import * as qs from 'qs';
import { v1 as uuidv1 } from 'uuid';
import * as NodeRSA from 'node-rsa';

@Injectable()
export class ZalopayService {
    private url;
    constructor(private trustypayService: TrustypayService,@Inject(forwardRef(() => CheckoutService)) private readonly checkoutService: CheckoutService,) {
        this.url = 'https://454a-171-241-89-121.ngrok-free.app'
    }
    private config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create",
        endpointVerifyAccount: "https://sb-openapi.zalopay.vn/v2/disbursement/user",
        endpointTransfer: "https://sb-openapi.zalopay.vn/v2/disbursement/transfer-fund",
        endpointquery: "https://sb-openapi.zalopay.vn/v2/query",
        rsaPublicKey: `
        -----BEGIN PUBLIC KEY-----
        MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBAMsHyik+FG0NjTxCu3yHTo8EczhRIlZA6Y1IE0yTGEOwfqN4hD2prbrO0HxaWrVBUjHholVyhkmGpMm56vGHQ7UCAwEAAQ==
        -----END PUBLIC KEY-----
        `
    };

    async verifyAccount() {
        const time = Date.now();
        const message = [Number(this.config.app_id), '0983946066', time].join("|");
        const mac = CryptoJS.HmacSHA256(message, this.config.key1).toString();
        const result = await axios.post(this.config.endpointVerifyAccount, {
            app_id: Number(this.config.app_id), phone: '0983946066', time, mac
        });
        return result.data;
    }

    async withDrawMoney() {
        const paymentCodeRaw = "240626000000741";
        const key = new NodeRSA(this.config.rsaPublicKey, {
            encryptionScheme: 'pkcs1'
        });
        const receiver_info = key.encrypt(paymentCodeRaw, 'base64');
        const order: any = {
            app_id: Number(this.config.app_id),
            payment_id: "240626000000741",
            partner_order_id: "231010_6006493217",
            disbursement_type: "WALLET",
            receiver_info: "Mc_oDa9hPMGDN36mVeSd-RGAMoU3azapJkxPSr16zCs",
            amount: 100000,
            description: "Bonuses for users",
            partner_embed_data: {},
            extra_info: {},
            time: Date.now(),
        }

        const message = `${order.app_id}
        |${order.payment_id}
        |${order.partner_order_id}
        |${order.disbursement_type}
        |${order.receiver_info}
        |${order.amount}
        |${order.description}
        |${order.partner_embed_data}
        |${order.extra_info}
        |${order.time}`;

        order.mac = CryptoJS.HmacSHA256(message, this.config.key1).toString();
        const result = await axios.post(this.config.endpointTransfer, null, { params: order, headers: { 'Content-Type': 'application/json' } });
        return result.data;
    }

    async payment(listOrder: any) {
        const embed_data = {
            redirecturl: this.url
        };
        const items = []

        // const items = listOrder;
        const transID = Math.floor(Math.random() * 1000000);
        let amount = 0
        listOrder.map((item: any) => {
            item.order_products.map((orderProduct) => {
                orderProduct.item_products.map((itemProduct) => {
                    items.push({
                        itemid: itemProduct.productId._id,
                        itemname: itemProduct.productId.product_name,
                        itemprice: itemProduct.productId.product_price,
                        itemquantity: itemProduct.quantity,
                        itemshop: itemProduct.productId.product_shop,
                        itemOrder: item._id
                    })
                })
            })
            amount += item.order_checkout.totalCheckout
        })
        const order: any = {
            app_id: this.config.app_id.toString(),
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "240626000000741",
            app_time: Date.now(),
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount,
            description: `Payment for the order #${transID}`,
            callback_url: `${this.url}/zalopay/callback`,
        };

        const data = `${this.config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();

        const result = await axios.post(this.config.endpoint, null, { params: order });
        return result.data;
    }

    async callback(body: any) {
        let result: any = {};
        const item = JSON.parse(JSON.parse(body.data).item)
        try {
            const dataStr = body.data;
            const reqMac = body.mac;

            const mac = CryptoJS.HmacSHA256(dataStr, this.config.key2).toString();
            console.log("mac =", mac);

            // kiểm tra callback hợp lệ (đến từ ZaloPay server)
            if (reqMac !== mac) {
                // callback không hợp lệ
                result.return_code = -1;
                result.return_message = "mac not equal";
            } else {
                // thanh toán thành công
                // merchant cập nhật trạng thái cho đơn hàng
                await this.trustypayService.checkShopPayment(item)
                await this.checkoutService.updateStatusOrder(item)
                const dataJson = JSON.parse(dataStr);
                console.log("update order's status = success where app_trans_id =", dataJson["app_trans_id"]);

                result.return_code = 1;
                result.return_message = "success";
            }
        } catch (ex) {
            result.return_code = 0; // ZaloPay server sẽ callback lại (tối đa 3 lần)
            result.return_message = ex.message;
        }

        return result;
    }

    async checkStatus(id: string) {
        interface PostData {
            app_id: string;
            app_trans_id: string;
            mac?: string;
        }

        let postData: PostData = {
            app_id: this.config.app_id.toString(),
            app_trans_id: id, // Input your app_trans_id
        }

        let data = postData.app_id + "|" + postData.app_trans_id + "|" + this.config.key1; // appid|app_trans_id|key1
        postData.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();


        let postConfig = {
            method: 'post',
            url: this.config.endpointquery,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: qs.stringify(postData)
        };

        const result = await axios(postConfig)
        return result.data
    }
}
