import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class VerifyOtp {
    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ type: String, description: "email", required: true, example: "ngkhacdai@gmail.com" })
    email: string

    @IsString()
    @ApiProperty({ type: String, description: "password", example: "123456" })
    password: string

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ type: Number, description: "otp", required: true, example: "123456" })
    otp: number
}