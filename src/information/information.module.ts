import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from 'src/schema/information.schema';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Information.name, schema: InformationSchema }]),
    CloudinaryModule,
    UsersModule
  ],
  controllers: [InformationController],
  providers: [InformationService],
})
export class InformationModule { }
