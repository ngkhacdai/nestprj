import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Room, RoomDocument } from 'src/schema/room.schema';

@Injectable()
export class RoomService {
    constructor(@InjectModel(Room.name) private roomModel: Model<RoomDocument>) { }

    async findOne(userId: string, shopId: string): Promise<RoomDocument | null> {
        let findRoom = await this.roomModel.findOne({ userId, shopId }).populate({ path: 'messageId' }).exec();
        if (!findRoom) {
            findRoom = new this.roomModel({ userId, shopId });
            await findRoom.save();
        }

        return findRoom;
    }

    async getListUser(userId: string): Promise<RoomDocument[]> {
        const listRoom = await this.roomModel
            .find({ userId }, { shopId: 1, userId: 1, _id: 1 })
            .populate({ path: 'shopId' })
            .sort({ updatedAt: -1 })
            .exec();
        return listRoom;
    }
    async getListUserByShop(shopId: string): Promise<RoomDocument[]> {
        const listRoom = await this.roomModel
            .find({ shopId }, { shopId: 1, userId: 1, _id: 1 })
            .populate({
                path: "userId",
                select: "information",
                populate: {
                    path: "information",
                    model: "Information" // Specify the model name explicitly
                },
            })
            .sort({ updatedAt: -1 })
            .exec();
        return listRoom
    }
}
