import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Type } from 'class-transformer';
import { Express } from 'express';

export class StoreDetailDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'nameShop', required: true, example: 'ngkhacdai' })
    nameShop: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'addressShop', required: true, example: '123456' })
    addressShop: string;

    @IsNumber()
    @IsNotEmpty()
    @Type(() => Number)
    @ApiProperty({ type: Number, description: 'phoneNumberShop', required: true, example: 123456 })
    phoneNumberShop: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: 'descaption', required: true, example: 'Uy tín chất lượng' })
    des: string;

    @ApiProperty({ type: 'string', format: 'binary', required: true })
    file: Express.Multer.File
}
