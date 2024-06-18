import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsEmail, IsEnum, IsNotEmpty, IsObject, IsString } from "class-validator";
import mongoose from "mongoose";

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