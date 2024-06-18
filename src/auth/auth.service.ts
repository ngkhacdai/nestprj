import { User, UserDocument, UserSchema } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

const fakeUser = [{
    id: 1,
    username: 'ngkhacdai',
    password: '123456'
}]

@Injectable()
export class AuthService {
    constructor(private jwtService: JwtService,
        @InjectModel(User.name) private userModule: Model<UserDocument>
    ) { }
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
    async createUser({ email, password, role }) {
        const user = await this.userModule.create({
            email,
            password,
            role
        })
        return user
    }
}
