import { Body, Controller, Delete, Patch, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CartService } from './cart.service';
import { ApiBearerAuth, ApiBody, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AddProductDto } from './dto/add-product.dto';
import { Request } from 'express';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';
import { RolesGuard } from 'src/auth/gruards/role.gruard';
import { Roles } from 'src/auth/role.decorator';
import { DeleteProductCart } from './dto/delete-product.dto';
import { UpdateCart } from './dto/update-product.dto';

@ApiTags('cart')
@Controller('cart')
export class CartController {
    constructor(private cartService: CartService) { }

    @Post()
    @ApiBody({ type: AddProductDto })
    @UseGuards(JwtGruard, RolesGuard)
    @Roles("User")
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Add product to cart successfully' })
    addProductToCart(@Body(ValidationPipe) product: AddProductDto, @Req() req: Request) {
        return this.cartService.addProductToCart(product, req.user);
    }

    @Patch()
    @Post()
    @ApiBody({ type: UpdateCart })
    @UseGuards(JwtGruard, RolesGuard)
    @Roles("User")
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update' })
    updateQuantiryProduct(@Body(ValidationPipe) product: UpdateCart, @Req() req: Request) {
        return this.cartService.updateQuantityProduct(req.user.toString(), product);
    }
    @Delete()
    @Post()
    @ApiBody({ type: DeleteProductCart })
    @UseGuards(JwtGruard, RolesGuard)
    @Roles("User")
    @ApiBearerAuth()
    @ApiOkResponse({ description: 'Update' })
    deleteProduct(@Body(ValidationPipe) product: DeleteProductCart, @Req() req: Request) {
        return this.cartService.deleteProduct(req.user.toString(), product);
    }
}
