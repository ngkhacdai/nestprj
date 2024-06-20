import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateInformationDto {
    @IsNotEmpty()
    @IsNumber()
    phoneNumber: number;


    avatar: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    gender: string;
}