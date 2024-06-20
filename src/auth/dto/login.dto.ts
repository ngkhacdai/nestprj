import { PartialType } from "@nestjs/mapped-types";
import { signupDto } from "./signup.dto";

export class LoginDto extends PartialType(signupDto) { }