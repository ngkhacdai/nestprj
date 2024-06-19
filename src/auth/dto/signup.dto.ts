import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class signupDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    @ApiProperty({ type: String, description: "email", example: "ngkhacdai@gmail.com" })
    email: string

    @IsString()
    @ApiProperty({ type: String, description: "password", example: "123456" })
    password: string

    @IsString()
    @IsEnum(["User", "Shop", "Admin"])
    @ApiProperty({ type: String, description: "status", example: "User", default: "User" })
    role: string = "User"
}