import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Schema as MongooseSchema } from 'mongoose';

const product_attributes_schema = {
    color: String,
    quantity: { type: Number, default: 0 },
    options: [
        {
            size: { type: String },
            options_quantity: { type: Number },
        }
    ],
}

export type ProductDocument = Product & Document;

@Schema({ timestamps: true })
export class Product {
    @Prop({ type: String, required: true })
    product_name: string

    @Prop([{ type: String }])
    product_thumb: string

    @Prop({ type: String })
    product_description: string

    @Prop({ type: String })
    product_slug: string

    @Prop({ type: Number, required: true })
    product_price: number

    @Prop({ type: Number, required: true })
    product_quantity: number

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'StoreDetail' })
    product_shop: MongooseSchema.Types.ObjectId

    @Prop({ type: MongooseSchema.Types.ObjectId })
    category: MongooseSchema.Types.ObjectId

    @Prop({ type: [product_attributes_schema] })
    product_attributes: Array<Record<string, any>>

    @Prop({
        type: Number,
        default: 5,
        min: [1, 'Rating must be above 1.0'],
        max: [5, 'Rating must be below 5.0'],
        set: (val: number) => Math.round(val * 10) / 10,
    })
    product_ratingAverage: number;

    @Prop({ type: Number, default: 0 })
    product_sold: number

    @Prop({ type: Boolean, default: true, index: true, select: true })
    isDraft: boolean

    @Prop({ type: Boolean, default: false, index: true, select: true })
    isPublished: number
}

export const ProductSchema = SchemaFactory.createForClass(Product);
