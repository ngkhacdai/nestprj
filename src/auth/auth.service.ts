import { User, UserDocument } from 'src/schema/user.schema';
import { JwtService } from '@nestjs/jwt';
import { ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { totp } from 'otplib';
import { randomBytes } from 'crypto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';
import { signupDto } from './dto/signup.dto';

const fakeUser = [{
    id: 1,
    username: 'ngkhacdai',
    password: '123456'
}]

@Injectable()
export class AuthService {
    private secret: string;
    constructor(
        private jwtService: JwtService,
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private readonly mailService: MailerService
    ) {
        this.secret = randomBytes(20).toString('hex');
        totp.options = { step: 60 }; // Set the OTP validity period to 60 seconds
    }

    async validateUser({ email, password }: signupDto) {
        const findUser = await this.userModel.findOne({ email: email })
        if (!findUser) {
            throw new UnauthorizedException('Invalid email')
        }
        const hashPassword = await bcrypt.compare(password, findUser.password)
        if (!hashPassword) {
            throw new UnauthorizedException('Invalid password')
        }
        else {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user);
        }
    }

    async createUser(object: any): Promise<string> {
        const data = JSON.stringify(object);
        const otp = totp.generate(this.secret + data);
        var mainOptions = { // thiết lập đối tượng, nội dung gửi mail
            from: 'ngkhacdai@gmail.com',
            to: object.email,
            subject: 'Trusty Buy',
            text: `Mã xác nhận của bạn là: ${otp} \nMã xác nhận có hiệu lực là 60 giây`,
        }
        await this.mailService.sendMail(mainOptions)
        return otp
    }

    async verifyOtp(otp: string, object: any): Promise<Object> {
        const data = JSON.stringify(object);
        const isValid = await totp.check(otp, this.secret + data);
        if (!isValid) {
            throw new ForbiddenException('Otp not valid')
        }
        const hashPassword = await bcrypt.hash(object.password, 10)
        const user = await this.userModel.create({
            email: object.email,
            password: hashPassword,
            role: object.role
        }, { new: true })
        return user;
    }
}
