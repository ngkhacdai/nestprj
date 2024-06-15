import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Message } from './message.schema';

export type RoomDocument = Room & Document;

@Schema({ timestamps: true })
export class Room {
    @Prop([{ type: MongooseSchema.Types.ObjectId, ref: 'Message' }])
    messageId: Message[];

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
    userId: MongooseSchema.Types.ObjectId;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'StoreDetail' })
    shopId: MongooseSchema.Types.ObjectId;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
