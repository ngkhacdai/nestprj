import { Module, forwardRef } from '@nestjs/common';
import { CheckoutController } from './checkout.controller';
import { CheckoutService } from './checkout.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from 'src/schema/order.schema';
import { UsersModule } from 'src/users/users.module';
import { ProductModule } from 'src/product/product.module';
import { AddressModule } from 'src/address/address.module';
import { StripeModule } from 'src/stripe/stripe.module';
import { ZalopayModule } from 'src/zalopay/zalopay.module';
import { NotificationModule } from 'src/notification/notification.module';
import { AppGateway } from 'src/app/app.gateway';
import { RoomModule } from 'src/room/room.module';
import { GatewayModule } from 'src/app/gateway.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    UsersModule,
    ProductModule,
    AddressModule,
    StripeModule,
    forwardRef(() => ZalopayModule),
    NotificationModule,
    GatewayModule
  ],
  controllers: [CheckoutController],
  providers: [CheckoutService],
  exports: [CheckoutService]
})
export class CheckoutModule { }
