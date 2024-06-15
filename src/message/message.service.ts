import { MessageModule } from './message.module';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from 'src/schema/message.schema';
import { Room, RoomDocument } from 'src/schema/room.schema';

@Injectable()
export class MessageService {
    constructor(@InjectModel(Message.name) private messageModule: Model<MessageDocument>) { }
    @InjectModel(Room.name) private roomModule: Model<RoomDocument>
    async createMessage(message: string, senderID: string, userId: string, shopId: string): Promise<MessageDocument | null> {
        const newMessage = await this.messageModule.create({ message, senderID })
        await this.roomModule
            .findOneAndUpdate(
                { userId, shopId },
                { $push: { messageId: newMessage._id } },
            )
        return newMessage
    }
}
