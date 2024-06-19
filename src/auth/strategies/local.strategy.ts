import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './../auth.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }
    async validate(email: string, password: string, role: string) {
        const user = await this.authService.validateUser({ email, password, role })
        if (!user) throw new UnauthorizedException()
        return user
    }
}