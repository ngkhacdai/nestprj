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
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { StoredetailModule } from './storedetail/storedetail.module';
import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ConfigModule.forRoot()
    ,
    MongooseModule.forRoot(
      process.env.DATABASE_URL,
    ),
    UsersModule,
    RoomModule,
    StoredetailModule,
    MessageModule,
    InformationModule,
    AuthModule,
    CloudinaryModule,
    ProductModule,
  ],
  controllers: [AppController],
  providers: [AppService, AppGateway],
})
export class AppModule { }
