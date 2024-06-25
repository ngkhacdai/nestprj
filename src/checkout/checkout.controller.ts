import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CheckoutService } from './checkout.service';
import { Body, Controller, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';
import { RolesGuard } from 'src/auth/gruards/role.gruard';
import { Roles } from 'src/auth/role.decorator';
import { Request } from 'express';

@ApiTags('checkout')
@Controller('checkout')
export class CheckoutController {
    constructor(private checkoutService: CheckoutService) { }

    @Post()
    @UseGuards(JwtGruard, RolesGuard)
    @Roles('User')
    @ApiBearerAuth()
    @ApiCreatedResponse({ description: '' })
    @ApiBody({ type: CreateCheckoutDto })
    checkout(@Body(ValidationPipe) body: CreateCheckoutDto, @Req() req: Request) {
        return this.checkoutService.checkout(req.user.toString(), body)
    }

}
