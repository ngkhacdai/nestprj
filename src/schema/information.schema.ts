import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";

export type InformationDocument = HydratedDocument<Information>

@Schema({ timestamps: true, collection: 'informations' })
export class Information {
    @Prop({ index: true })
    phoneNumber: number

    @Prop({ ref: "Address" })
    address: mongoose.Schema.Types.ObjectId

    @Prop()
    avatar: string

    @Prop()
    fullName: string

    @Prop({ enum: ["Nam", "Nữ", "Khác"], default: "Nam" })
    gender: string
}

export const InformationSchema = SchemaFactory.createForClass(Information)