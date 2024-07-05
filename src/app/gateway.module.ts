import { Module } from '@nestjs/common';
import { MessageModule } from 'src/message/message.module';
import { NotificationModule } from 'src/notification/notification.module';
import { RoomModule } from 'src/room/room.module';
import { AppGateway } from './app.gateway';

@Module({
    imports: [
        RoomModule,
        MessageModule,
        NotificationModule,
    ],
    providers: [AppGateway],
    exports: [AppGateway],
})
export class GatewayModule { }
