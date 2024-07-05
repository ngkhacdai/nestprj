import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';

class ProductCheckout {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        example: '665837c6c7ca4cc71fae05e5',
    })
    shopId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        example: '66850eb85e5af60f12a6c6ce',
    })
    productId: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ type: Number, required: true, example: 1 })
    quantity: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: 'Cam' })
    color: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, required: true, example: 'L' })
    size: string;

    @IsString()
    @ApiProperty({ type: String })
    discountId: string;
}

export class CreateCheckoutDto {
    @IsArray()
    @ApiProperty({ type: [ProductCheckout] })
    productCheckout: ProductCheckout[];

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        example: '6686207a5e5af60f12a6d5ee',
    })
    addressId: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({
        type: String,
        required: true,
        enum: ['Thanh toán khi nhận hàng', 'Card'],
        example: 'Thanh toán khi nhận hàng',
    })
    order_payment: string;
}
