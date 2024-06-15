import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { Room, RoomSchema } from 'src/schema/room.schema';
import { StoreDetail, StoreDetailSchema } from 'src/schema/storeDetail.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Room.name, schema: RoomSchema }]),
        MongooseModule.forFeature([{ name: StoreDetail.name, schema: StoreDetailSchema }]),
    ],
    providers: [RoomService],
    controllers: [RoomController],
    exports: [RoomService],
})
export class RoomModule { }
