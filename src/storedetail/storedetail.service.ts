import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { UsersService } from './../users/users.service';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { StoreDetail, StoreDetailDocument } from 'src/schema/storeDetail.schema';
import { Model } from 'mongoose';

@Injectable()
export class StoredetailService {
    constructor(
        private cloudinaryService: CloudinaryService,
        @InjectModel('storeDetails1') private storeDetailModel: Model<StoreDetailDocument>,
        private userService: UsersService
    ) { }
    async updateStoreDetail(file, object, userId) {
        const findUser = await this.userService.findUserById(userId)
        if (!findUser) {
            throw new ForbiddenException('User not found')
        }
        const result = await this.cloudinaryService.uploadImage(file);
        if (!result) {
            throw new ForbiddenException('File upload failed')
        }
        const updateShop = await this.storeDetailModel.create({
            nameShop: object.nameShop,
            phoneNumberShop: object.phoneNumberShop,
            avatarShop: result.url,
            des: object.des,
            address: object.address,
        })
        return updateShop;
    }

    async getStoreDetail(userId: string) {
        const findStore = await this.storeDetailModel.findOne({
            _id: userId
        })
        return findStore
    }
    async updatePayment(userId: string, paymentId: string) {
        return await this.storeDetailModel.findOneAndUpdate({ _id: userId }, {
            $set: {
                trustypay: paymentId
            }
        }, { new: true })
    }
}
