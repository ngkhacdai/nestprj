import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type MessageDocument = HydratedDocument<Message>;

@Schema({ timestamps: true, collection: "messagev2" })
export class Message {
    @Prop()
    senderID: mongoose.Schema.Types.ObjectId

    @Prop()
    message: string
}

export const MessageSchema = SchemaFactory.createForClass(Message)