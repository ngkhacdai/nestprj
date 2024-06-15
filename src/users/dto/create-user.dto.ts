import { IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUser {
    @IsNotEmpty()
    @IsString()
    name: string;
    @IsEnum(['ADMIN', 'USER', 'SHOP'])
    role: string
}