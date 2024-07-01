import { Module } from '@nestjs/common';
import { TrustypayController } from './trustypay.controller';
import { TrustypayService } from './trustypay.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrustyPay, TrustyPaySchema } from 'src/schema/trustypay.schema';
import { ProductModule } from 'src/product/product.module';
import { StoredetailModule } from 'src/storedetail/storedetail.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: TrustyPay.name, schema: TrustyPaySchema }]),
    ProductModule,
    StoredetailModule
  ],
  controllers: [TrustypayController],
  providers: [TrustypayService],
  exports: [TrustypayService]
})
export class TrustypayModule { }
