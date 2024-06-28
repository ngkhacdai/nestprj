import { Module } from '@nestjs/common';
import { ZalopayController } from './zalopay.controller';
import { ZalopayService } from './zalopay.service';
import { TrustypayModule } from 'src/trustypay/trustypay.module';

@Module({
  imports: [
    TrustypayModule
  ],
  controllers: [ZalopayController],
  providers: [ZalopayService],
  exports: [ZalopayService]
})
export class ZalopayModule { }
