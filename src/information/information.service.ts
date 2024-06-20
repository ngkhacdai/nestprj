import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Information, InformationDocument } from 'src/schema/information.schema';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class InformationService {
    constructor(private cloudinaryService: CloudinaryService, @InjectModel(Information.name) private informationModel: Model<InformationDocument>
        , private userSrevice: UsersService) { }

    async createInformation(file, object, userId) {
        const findUser = await this.userSrevice.findUserById(userId)
        if (!findUser) {
            throw new ForbiddenException('User not found')
        }
        const result = await this.cloudinaryService.uploadImage(file);
        if (!result) {
            throw new ForbiddenException('File upload failed')
        }
        const updateUser = await this.informationModel.create({
            phoneNumber: object.phoneNumber,
            avatar: result.url,
            fullName: object.fullName,
            gender: object.gender
        })
        await this.userSrevice.updateUserInformation(userId, updateUser._id)
        return updateUser;
    }
    async updateUser(file: any, object, userId) {
        const findUser = await this.userSrevice.findUserById(userId)
        if (!findUser) {
            throw new ForbiddenException('User not found')
        }
        let avatarUrl;
        if (file) {
            const result = await this.cloudinaryService.uploadImage(file);
            if (!result) {
                throw new ForbiddenException('File upload failed');
            }
            avatarUrl = result.url;
        }

        const updateData: any = {
            phoneNumber: object.phoneNumber,
            fullName: object.fullName,
            gender: object.gender
        };

        if (avatarUrl) {
            updateData.avatar = avatarUrl;
        }

        const updateUser = await this.informationModel.findOneAndUpdate({ _id: findUser.information }, {
            $set: updateData
        }, { new: true })
        return updateUser;
    }
}
