import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { HydratedDocument, Schema as MongooseSchema } from "mongoose";

export type UserDocument = HydratedDocument<User>;

@Schema({
    timestamps: true,
})
export class User {
    @Prop({ unique: true, required: true, index: true })
    email: string;

    @Prop()
    password: string;

    @Prop({ enum: ["active", "inactive"], default: 'inactive' })
    status: string

    @Prop({ enum: ["Admin", "Shop", "User"], default: "User" })
    role: string

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Information', default: null })
    information: mongoose.Schema.Types.ObjectId;

    @Prop({ default: false })
    disable: boolean
}

export const UserSchema = SchemaFactory.createForClass(User);