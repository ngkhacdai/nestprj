import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from 'src/schema/product.schema';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    UsersModule,
    CloudinaryModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports: [ProductService]
})
export class ProductModule { }
