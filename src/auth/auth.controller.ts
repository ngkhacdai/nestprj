import { Body, Controller, Get, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { LocalGruard } from './gruards/local.gruard';
import { Request } from 'express';
import { JwtGruard } from './gruards/jwt.gruard';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    @Post('login')
    @UseGuards(LocalGruard)
    @ApiBody({ type: AuthPayloadDto })
    login(@Req() req: Request) {
        return req.user
    }
    @Get('')
    @UseGuards(JwtGruard)
    @ApiBearerAuth()
    get() {
        return 'nothing in here'
    }
}
