import { Type } from 'class-transformer';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, Mongoose, ObjectId } from 'mongoose';

export type NotificationDocument = Notification & Document

@Schema({ timestamps: true })
export class Notificationv2 {
    @Prop({ type: String, required: true })
    title: string

    @Prop({ type: String, required: true })
    content: string

    @Prop({ type: mongoose.Schema.Types.ObjectId })
    receiverID: mongoose.Schema.Types.ObjectId

    @Prop({ type: Boolean, default: false })
    isRead: boolean
}

export const NotificationSchema = SchemaFactory.createForClass(Notificationv2);

NotificationSchema.index({ createdAt: 1 }, { expireAfterSeconds: 864000 })