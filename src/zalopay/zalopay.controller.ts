import { ZalopayService } from './zalopay.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('zalopay')
export class ZalopayController {
    constructor(private zalopayService: ZalopayService) { }

    @Post()
    async payment() {
        return await this.zalopayService.payment();
    }

    @Post('callback')
    async callback(@Body() body) {
        console.log('zzzz');

        const result = await this.zalopayService.callback(body);
        return result
    }
}
