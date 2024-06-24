import { PartialType } from "@nestjs/mapped-types";
import { AddProductDto } from "./add-product.dto";
import { IsNotEmpty, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class DeleteProductCart extends PartialType(AddProductDto) {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'productId', example: '6662acf35e5af60f12a39a90' })
    productId: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'quantcolority', example: 'Lam' })
    color: string

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'size', example: 'L' })
    size: string
}