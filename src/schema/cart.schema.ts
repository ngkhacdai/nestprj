import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";

export type CartDocument = Document & Cart;

class CartProducts {
    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'product' })
    productId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number })
    quantity: number;

    @Prop({ type: String })
    color: string;

    @Prop({ type: String })
    size: string;
}

@Schema()
export class Cart {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true })
    cart_userId: mongoose.Schema.Types.ObjectId;

    @Prop({ type: Number, default: 0 })
    cart_count_product: number;

    @Prop({ type: [CartProducts], default: [] })
    cart_products: CartProducts[];
}

export const CartSchema = SchemaFactory.createForClass(Cart);
