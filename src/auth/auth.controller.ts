import { Body, Controller, ForbiddenException, Get, Post, Req, UseGuards, ValidationPipe } from '@nestjs/common';
import { LocalGruard } from './gruards/local.gruard';
import { Request } from 'express';
import { JwtGruard } from './gruards/jwt.gruard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { signupDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { ExceptionsHandler } from '@nestjs/core/exceptions/exceptions-handler';
import { UsersService } from 'src/users/users.service';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }
    @Post('register')
    @ApiBody({ type: signupDto })
    signUp(@Body(ValidationPipe) body: signupDto) {
        const findUser = this.usersService.findOne(body.email)
        if (findUser) throw new ForbiddenException('Email already in use')
        const user = this.authService.createUser(body);
        if (!user) throw new ExceptionsHandler()
        return body
    }
    @Get('')
    @UseGuards(JwtGruard)
    @ApiBearerAuth()
    get() {
        return 'nothing in here'
    }
}
