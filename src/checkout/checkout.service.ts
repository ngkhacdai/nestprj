import { AppGateway } from './../app/app.gateway';
import { NotificationService } from './../notification/notification.service';
import { ZalopayService } from './../zalopay/zalopay.service';
import { StripeService } from './../stripe/stripe.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from 'src/schema/order.schema';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import * as _ from 'lodash';
import { ProductService } from 'src/product/product.service';
import { AddressService } from 'src/address/address.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class CheckoutService {
    constructor(@InjectModel(Order.name) private orderModel: Model<Order>,
        private productService: ProductService,
        private addressService: AddressService,
        private usersService: UsersService,
        private stripeService: StripeService,
        private zalopayService: ZalopayService,
        private notificationService: NotificationService,
        private appGateway: AppGateway
    ) { }

    async checkout(userId: string, body: CreateCheckoutDto) {
        const grouped = _(body.productCheckout).groupBy('shopId').value();
        const user = await this.usersService.getInformationByUserId(userId);
        if (!user) {
            throw new ForbiddenException('User not found');
        }
        const listProduct = []
        const address = await this.addressService.getAddressById(body.addressId, user);
        if (!address) {
            throw new ForbiddenException('Address not found');
        }

        const listOrder = await Promise.all(Object.values(grouped).map(async (item, index) => {
            let totalPrice = 0;
            const item_products = [];

            // Use for...of loop to properly await async operations
            for (const item1 of item) {
                const product = await this.productService.findOneProduct(item1.productId);
                let checkProduct = false
                product.product_attributes.map((product1) => {
                    if (product1.color === item1.color) {
                        product1.options.map((product2) => {
                            if (product2.size === item1.size && product2.options_quantity >= item1.quantity) {
                                return checkProduct = true
                            }
                        })
                    }
                })
                if (!checkProduct) {
                    throw new ForbiddenException('Product not found');
                }
                totalPrice += item1.quantity * product.product_price;
                item_products.push({
                    productId: item1.productId,
                    color: item1.color,
                    size: item1.size,
                    quantity: item1.quantity,
                });
                await this.productService.decrementQuantity(item1.quantity, item1.productId, item1.color, item1.size)
                listProduct.push(product);
            }

            const order_checkout = {
                totalPrice,
                feeShip: 30000,
                totalDiscount: 0,
                totalCheckout: totalPrice
            };

            try {
                const newOrder = await (await this.orderModel.create({
                    order_userId: userId,
                    order_checkout,
                    order_shipping: {
                        Address: address.customAddress,
                        fullName: address.userinfor[0].userName,
                        PhoneNumber: address.userinfor[0].phoneNumber
                    },
                    order_payment: body.order_payment,
                    order_products: {
                        shopId: Object.keys(grouped)[index],
                        item_products
                    }
                })).populate({
                    path: 'order_products.item_products.productId',
                    model: 'Product',
                });
                if (body.order_payment === 'Card') {
                    await this.stripeService.checkOut(totalPrice)
                }
                return newOrder;
            } catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        }));

        switch (body.order_payment.toLocaleLowerCase()) {
            case 'card':
                const response = await this.zalopayService.payment(listOrder)
                return response;
            default:
                listOrder.map(async (item) => {
                    let content = "Sản phẩm: "
                    let receiverID = ""
                    item.order_products.map((item1: any) => {
                        item1.item_products.map((productId) => {

                            content += productId.productId.product_name + " "
                            receiverID = productId.productId.product_shop
                        })
                    })
                    const notifi = await this.notificationService.create('Đơn hàng mới', content, receiverID)
                    console.log('Thông báo đơn hàng', notifi);

                    // this.appGateway.handleSendNotification(notifi)
                })
                return listOrder;

        }


    }
    async updateStatusOrder(item: any) {
        const order = await item.map(async order => {
            await this.orderModel.findOneAndUpdate({ _id: order.itemOrder }, {
                $set: {
                    order_status: 'Đã thanh toán'
                }
            })
        }, { new: true })
        //log order update
        console.log(order);

    }
}
