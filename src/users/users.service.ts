import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { User } from 'src/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }
    private userData = [
        {
            id: 1,
            name: 'A',
            role: 'ADMIN'
        },
        {
            id: 2,
            name: 'B',
            role: 'USER'
        },
        {
            id: 3,
            name: 'C',
            role: 'SHOP'
        },
        {
            id: 4,
            name: 'D',
            role: 'SHOP'
        },
        {
            id: 5,
            name: 'E',
            role: 'USER'
        },

    ]

    findAll() {
        return this.userData
    }
    async findOne(email: string) {
        const user = this.userModel.findOne({ email: email });
        return user
    }
    create(createUser: CreateUser) {
        const createData = this.userData.push({
            id: this.userData.length + 1,
            name: createUser.name,
            role: createUser.role
        })
        return this.userData
    }
    update(id, updateUser: UpdateUser) {
        this.userData = this.userData.map(user => {
            if (user.id === id) {
                return {
                    ...user,
                    ...updateUser
                }
            }
            return user
        })
        return this.userData
    }
}
