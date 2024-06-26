import { Module } from '@nestjs/common';
import { CloudinaryService } from './cloudinary.service';
import { Cloudinary } from './cloudinary/cloudinary';

@Module({
  providers: [CloudinaryService, Cloudinary],
  exports: [CloudinaryService]
})
export class CloudinaryModule { }
