import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";


export class AddProductDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'productId', example: '6662acf35e5af60f12a39a90' })
    productId: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, description: 'quantity', example: 10 })
    quantity: number

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'quantcolority', example: 'Lam' })
    color: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'size', example: 'L' })
    size: string
}