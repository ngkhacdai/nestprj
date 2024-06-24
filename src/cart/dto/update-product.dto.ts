import { PartialType } from "@nestjs/mapped-types";
import { AddProductDto } from "./add-product.dto";

export class UpdateCart extends PartialType(AddProductDto) { }