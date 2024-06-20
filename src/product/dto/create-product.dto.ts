import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsObject, IsString, ValidateNested, ArrayMinSize, IsArray, IsOptional } from "class-validator";

class OptionDto {
    @IsString()
    @ApiProperty({ example: 'S' })
    size: string;

    @IsNumber()
    @ApiProperty({ example: 100 })
    options_quantity: number;
}

class ProductAttributesDto {
    @IsString()
    @ApiProperty({ example: 'black' })
    color: string;

    @ApiProperty({ type: [OptionDto] })
    options: OptionDto[];
}

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'product_name', required: true, example: 'Sản phẩm 1' })
    product_name: string;

    @ApiProperty({ type: 'array', items: { type: 'string', format: 'binary' }, required: true })
    product_thumb: Express.Multer.File[];

    @IsString()
    @ApiProperty({ type: String, description: 'product_description', example: 'Mô tả sản phẩm' })
    product_description: string;

    @IsNumber()
    @Type(() => Number)
    @ApiProperty({ type: Number, description: 'product_price', required: true, example: 10000 })
    product_price: number;

    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: 'category', example: '657dd96725b94a98c4b49846' })
    category: string;

    @ApiProperty({
        type: () => ProductAttributesDto,
        description: 'product_attributes',
        example: [{
            color: 'black',
            options: [{
                size: 'S',
                options_quantity: 100
            }]
        }]
    })
    product_attributes?: ProductAttributesDto[];
}
