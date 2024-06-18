import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthPayloadDto {
    @ApiProperty({ type: String, description: 'username', example: 'ngkhacdai' })
    @IsNotEmpty()
    username: string;
    @ApiProperty({ type: String, description: 'password', example: '123456' })
    @IsNotEmpty()
    password: string;
}