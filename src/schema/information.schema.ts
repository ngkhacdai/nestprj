import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument } from "mongoose";
import { Address } from "./address.schema";

export type InformationDocument = HydratedDocument<Information>

@Schema({ timestamps: true, collection: 'informations' })
export class Information {
    @Prop({ index: true })
    phoneNumber: number

    @Prop([{ type: mongoose.Schema.Types.ObjectId, ref: "Address", default: null }])
    address: Address[]

    @Prop()
    avatar: string

    @Prop()
    fullName: string

    @Prop({ enum: ["Nam", "Nữ", "Khác"], default: "Nam" })
    gender: string
}

export const InformationSchema = SchemaFactory.createForClass(Information)