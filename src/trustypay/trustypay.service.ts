import { StoredetailService } from './../storedetail/storedetail.service';
import { InjectModel } from '@nestjs/mongoose';
import { ProductService } from './../product/product.service';
import { Injectable } from '@nestjs/common';
import { TrustyPay, TrustyPayDocument } from 'src/schema/trustypay.schema';
import { Model } from 'mongoose';

@Injectable()
export class TrustypayService {
    constructor(private productService: ProductService,
        @InjectModel(TrustyPay.name) private trustyPayModel: Model<TrustyPayDocument>,
        private storedetailService: StoredetailService
    ) { }
    async checkShopPayment(item: any) {
        item.map(async (i) => {
            const store = await this.storedetailService.getStoreDetail(i.itemshop.toString())
            if (!store.trustypay) {
                const payment = await this.trustyPayModel.create({
                    money: i.itemprice
                })
                await this.storedetailService.updatePayment(i.itemshop.toString(), payment._id.toString())
            } else {
                const payment = await this.trustyPayModel.findOneAndUpdate({
                    _id: store.trustypay
                }, {
                    $inc: {
                        money: i.itemprice
                    }
                })
            }
        })
    }
}
