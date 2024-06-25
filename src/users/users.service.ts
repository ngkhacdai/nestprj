import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from 'src/schema/user.schema';
import mongoose, { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async findOne(email: string) {
        const user = await this.userModel.findOne({ email: email });
        return user
    }
    async findUserById(id: string) {
        const user = await this.userModel.findOne({ _id: id });
        return user
    }

    async getInformationByUserId(userId: string) {
        const user = await this.userModel.findOne({ _id: userId }, { information: 1, _id: 0 }).populate({
            path: "information",
        }).exec()
        return user;
    }

    async updateUserInformation(userId: string, id: mongoose.Types.ObjectId) {
        const user = await this.userModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                information: id
            }
        });
        return user
    }
    async getRoleUser(userId: string) {
        const user = await this.userModel.findOne({ _id: userId }, { role: 1, _id: 0 });
        return user;
    }
}
