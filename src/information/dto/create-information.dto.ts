import { IsNotEmpty } from "class-validator";

export class CreateInformationDto {
    @IsNotEmpty()
    phoneNumber: number;

    avatar: string;

    @IsNotEmpty()
    fullName: string;

    @IsNotEmpty()
    gender: string;
}