import { Module } from '@nestjs/common';
import { InformationController } from './information.controller';
import { InformationService } from './information.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Information, InformationSchema } from 'src/schema/information.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Information.name, schema: InformationSchema }]),

  ],
  controllers: [InformationController],
  providers: [InformationService]
})
export class InformationModule { }
