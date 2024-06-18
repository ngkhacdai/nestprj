import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AppGateway } from './app/app.gateway';
import { RoomModule } from './room/room.module';
import { MessageModule } from './message/message.module';
import { InformationModule } from './information/information.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    ConfigModule.forRoot()
    ,
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ),
    UsersModule,
    RoomModule,
    MessageModule,
    InformationModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
