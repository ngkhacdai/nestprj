import { Body, Controller, ForbiddenException, Get, Param, ParseIntPipe, Post, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiCreatedResponse, ApiForbiddenResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { UsersService } from 'src/users/users.service';
import { signupDto } from './dto/signup.dto';
import { VerifyOtp } from './dto/verifyotp.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService, private usersService: UsersService) { }

    @Post('register')
    @ApiCreatedResponse()
    @ApiForbiddenResponse({ description: 'Email is available' })
    @ApiBody({ type: signupDto })
    async signUp(@Body(ValidationPipe) body: signupDto) {
        const findUser = await this.usersService.findOne(body.email);
        if (findUser) throw new ForbiddenException('Email already in use');
        const otp = await this.authService.createUser(body);
        return otp
    }

    @Post('verify/:otp')
    @ApiBody({ type: signupDto })
    @ApiForbiddenResponse({ type: 'Otp is not correct' })
    @ApiCreatedResponse()
    async verifyOtp(@Param('otp') otp: string, @Body(ValidationPipe) body: signupDto) {
        const user = await this.authService.verifyOtp(otp, body);
        return user
    }

    @Get('')
    @ApiBearerAuth()
    get() {
        return 'nothing in here';
    }
}
