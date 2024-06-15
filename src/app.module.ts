import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app/app.gateway';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { InformationModule } from './information/information.module';

@Module({
  imports: [
    MongooseModule.forRoot("mongodb+srv://wolfteam:dckKJBwsz5shrA8y@ecommercefashion.zxqrsqj.mongodb.net/Trusty_Buy"),
    UsersModule,
    RoomModule,  // Ensure RoomModule is imported
    MessageModule,
    InformationModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
