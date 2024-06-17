import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';

const fakeUser = [{
    id: 1,
    username: 'ngkhacdai',
    password: '123456'
}]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService) { }
    validateUser({ username, password }: AuthPayloadDto) {
        const findUser = fakeUser.find((user) => user.username === username)
        if (!findUser) {
            return null
        }
        if (findUser.password === password) {
            const { password, ...user } = findUser
            return this.jwtService.sign(user)
        }
        return null
    }
}
