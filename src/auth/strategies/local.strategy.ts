import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { signupDto } from '../dto/signup.dto';
import { Request } from 'express';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super({
            usernameField: 'email',
            passwordField: 'password',
            passReqToCallback: true,
        });
    }
    async validate(req: Request, email: string, password: string): Promise<any> {
        const role = req.body.role
        const user = await this.authService.validateUser({ email, password, role })
        if (!user) throw new UnauthorizedException()
        return user
    }
}