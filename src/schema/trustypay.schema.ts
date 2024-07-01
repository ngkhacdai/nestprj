import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type TrustyPayDocument = Document & TrustyPay

@Schema({ timestamps: true })
export class TrustyPay {
    @Prop({ type: Number })
    money: number

    @Prop({ type: String })
    zaloId: string

    @Prop({ type: String })
    zaloName: string

    @Prop({ type: Number })
    zaloNumber: number
}

export const TrustyPaySchema = SchemaFactory.createForClass(TrustyPay)