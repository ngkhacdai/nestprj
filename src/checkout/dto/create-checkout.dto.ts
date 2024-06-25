import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty, IsNumber, IsString } from "class-validator";

class ProductCheckout {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: '664b038613c96a9b38a7ed5f' })
    shopId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: '6662acf35e5af60f12a39a90' })
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, example: 1 })
    quantity: number

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: 'Lam' })
    color: string

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: 'L' })
    size: string

    @IsString()
    @ApiProperty({ type: String })
    discountId: string
}

export class CreateCheckoutDto {
    @IsArray()
    @ApiProperty({ type: [ProductCheckout] })
    productCheckout: ProductCheckout[]

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: '663d72eda406d088f8a1c6c2' })
    addressId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, enum: ["Thanh toán khi nhận hàng", "Card"], example: 'Thanh toán khi nhận hàng' })
    order_payment: string;
}