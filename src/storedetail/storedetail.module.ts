import { Module } from '@nestjs/common';
import { StoredetailController } from './storedetail.controller';
import { StoredetailService } from './storedetail.service';
import { MongooseModule } from '@nestjs/mongoose';
import { StoreDetail, StoreDetailSchema } from 'src/schema/storeDetail.schema';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: "storeDetails1", schema: StoreDetailSchema }]),
    UsersModule,
    CloudinaryModule
  ],
  controllers: [StoredetailController],
  providers: [StoredetailService]
})
export class StoredetailModule { }
