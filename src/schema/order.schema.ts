import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

export type OrderDocument = Order & Document

class orderCheckout {
    //Tổng tiền hàng
    @Prop({ type: Number, required: true })
    totalPrice: number;

    @Prop({ type: Number, required: true })
    feeShip: number;

    @Prop({ type: Number, default: 0 })
    totalDiscount: number;
    //Số tiền phải trả
    @Prop({ type: Number, required: true })
    totalCheckout: number;
}

class orderShipping {
    @Prop({ type: String, required: true })
    Address: string;
    @Prop({ type: String, required: true })
    fullName: string;
    @Prop({ type: Number, required: true })
    PhoneNumber: number;
}

class ItemProduct {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    productId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, required: true })
    quantity: number;

    @Prop({ type: String, required: true })
    color: string;

    @Prop({ type: String, required: true })
    size: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, default: null })
    discountId: mongoose.Schema.Types.ObjectId;
}

class orderProducts {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'StoreDetail', required: true })
    shopId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: [ItemProduct], required: true })
    item_products: ItemProduct[]
}

@Schema({ timestamps: true })
export class Order {
    @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
    order_userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: orderCheckout })
    order_checkout: object;

    @Prop({ type: orderShipping })
    order_shipping: object;

    @Prop({ type: String, required: true })
    order_payment: string;

    @Prop({ type: [orderProducts], required: true })
    order_products: orderProducts[];

    @Prop({ type: String, required: true, default: 'pending' })
    order_status: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order)