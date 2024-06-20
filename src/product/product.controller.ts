import { Request } from 'express';
import { ProductService } from './product.service';
import { Body, Controller, Post, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';

import { Roles } from 'src/auth/role.decorator';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { FilesInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from './dto/create-product.dto';
import { RolesGuard } from 'src/auth/gruards/role.gruard';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';

@ApiTags('product')
@Controller('product')
export class ProductController {
    constructor(private productService: ProductService) { }

    @Post('')
    @UseGuards(JwtGruard, RolesGuard)
    @Roles("Shop")
    @ApiBearerAuth()
    @ApiBody({ type: CreateProductDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FilesInterceptor('product_thumb', 10))
    createProduct(@Req() req: Request, @Body(ValidationPipe) body: CreateProductDto) {
        return this.productService.createProduct(req.files, body, req.user);
    }
}
