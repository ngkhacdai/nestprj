import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type StoreDetailDocument = StoreDetail & Document;

@Schema({ timestamps: true, collection: 'storeDetails1' })
export class StoreDetail {
    @Prop({ unique: true })
    nameShop: string;

    @Prop({ type: Number, index: true, unique: true })
    phoneNumberShop: number;

    @Prop()
    avatarShop: string;

    @Prop()
    des: string;

    @Prop({ type: String, unique: true, index: true })
    emailShop: string;

    @Prop()
    address: string;

    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'User' }])
    follower: MongooseSchema.Types.ObjectId[];
}

export const StoreDetailSchema = SchemaFactory.createForClass(StoreDetail);
