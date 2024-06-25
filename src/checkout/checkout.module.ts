import { Module } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schema/order.schema';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { AddressModule } from 'src/address/address.module';
import { StripeModule } from 'src/stripe/stripe.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    ProductModule,
    AddressModule,
    StripeModule
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService]
})
export class CheckoutModule { }
