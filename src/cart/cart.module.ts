import { CartSchema } from './../schema/cart.schema';
import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart } from 'src/schema/cart.schema';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
    UsersModule,
    ProductModule
  ],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule { }
