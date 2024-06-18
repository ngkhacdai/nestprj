import { ApiProperty } from "@nestjs/swagger";
import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUser {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({ type: String, description: "name", required: true, example: "ngkhacdai" })
    name: string;

    @IsEnum(['ADMIN', 'USER', 'SHOP'])
    @ApiProperty({ type: String, enum: ['ADMIN', 'USER', 'SHOP'], example: 'USER' })
    role: string
}