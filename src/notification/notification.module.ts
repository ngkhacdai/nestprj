import { Module } from '@nestjs/common';
import { NotificationController } from './notification.controller';
import { NotificationService } from './notification.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NotificationSchema, Notificationv2 } from 'src/schema/notificationv2.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Notificationv2.name, schema: NotificationSchema }])
  ],
  controllers: [NotificationController],
  providers: [NotificationService],
  exports: [NotificationService]
})
export class NotificationModule { }
