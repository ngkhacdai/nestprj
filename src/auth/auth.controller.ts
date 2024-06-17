import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGruard } from './gruards/local.gruard';
import { Request } from 'express';
import { JwtGruard } from './gruards/jwt.gruard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('login')
    @UseGuards(LocalGruard)
    login(@Req() req: Request) {
        return req.user
    }
    @Get('')
    @UseGuards(JwtGruard)
    get() {
        return []
    }
}
