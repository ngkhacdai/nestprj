import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AddressDocument = Address & Document

class UserInfor {
    username: string;
    phonenumber: string;
}

@Schema({ timestamps: true })
export class Address {
    @Prop({ type: String, required: true })
    nameAddress: string;

    @Prop({ type: String, required: true })
    customAddress: string;

    @Prop({ type: [UserInfor] })
    userinfor: object;
}

export const AddressSchema = SchemaFactory.createForClass(Address);