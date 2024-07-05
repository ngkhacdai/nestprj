import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NotificationDocument, Notificationv2 } from 'src/schema/notificationv2.schema';

@Injectable()
export class NotificationService {
    constructor(@InjectModel(Notificationv2.name) private notificationModule: Model<NotificationDocument>) { }

    async create(title: string, content: string, receiverID) {
        return await this.notificationModule.create({
            title,
            content,
            receiverID
        })
    }
    async getAllNotificationById(receiveId: string) {
        return await this.notificationModule.find({ receiveId }).sort({ isRead: -1 })
    }

    async changeStatus(noticationId: string) {
        return await this.notificationModule.findOneAndUpdate({ _id: noticationId }, {
            $set: {
                isRead: true
            }
        }, { new: true })
    }
}
