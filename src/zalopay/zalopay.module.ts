import { Module, forwardRef } from '@nestjs/common';
import { ZalopayController } from './zalopay.controller';
import { ZalopayService } from './zalopay.service';
import { TrustypayModule } from 'src/trustypay/trustypay.module';
import { CheckoutModule } from 'src/checkout/checkout.module';

@Module({
  imports: [
    TrustypayModule,forwardRef(() => CheckoutModule),
  ],
  controllers: [ZalopayController],
  providers: [ZalopayService],
  exports: [ZalopayService]
})
export class ZalopayModule { }
