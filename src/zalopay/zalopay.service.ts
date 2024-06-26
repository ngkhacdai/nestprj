import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as moment from 'moment';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class ZalopayService {
    private config = {
        app_id: "2553",
        key1: "PcY4iZIKFCIdgZvA6ueMcMHHUbRLYjPL",
        key2: "kLtgPl8HHhfvMuDHPwKfgfsY4Ydm9eIz",
        endpoint: "https://sb-openapi.zalopay.vn/v2/create"
    };

    async payment() {
        const embed_data = {
            redirecturl: 'http://localhost:3001/'
        };
        const items = [{}];
        const transID = Math.floor(Math.random() * 1000000);

        interface Order {
            app_id: string;
            app_trans_id: string;
            app_user: string;
            app_time: number;
            item: string;
            embed_data: string;
            amount: number;
            description: string;
            mac?: string;  // Make mac optional to allow defining it later
            callback_url: string
        }

        const order: Order = {
            app_id: this.config.app_id,
            app_trans_id: `${moment().format('YYMMDD')}_${transID}`,
            app_user: "user123",
            app_time: Date.now(), // milliseconds
            item: JSON.stringify(items),
            embed_data: JSON.stringify(embed_data),
            amount: 50000,
            description: `Lazada - Payment for the order #${transID}`,
            callback_url: "http://171.241.89.121:3001/zalopay/callback"
        };

        const data = `${this.config.app_id}|${order.app_trans_id}|${order.app_user}|${order.amount}|${order.app_time}|${order.embed_data}|${order.item}`;
        order.mac = CryptoJS.HmacSHA256(data, this.config.key1).toString();

        const result = await axios.post(this.config.endpoint, null, { params: order });
        return result.data;
    }

    callback(body: any) {
        let result: any = {};

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
}
