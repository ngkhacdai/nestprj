// import { TransferDto } from './dto/transfer.dto';
import { ZalopayService } from './zalopay.service';
import { Body, Controller, Param, Post } from '@nestjs/common';

@Controller('zalopay')
export class ZalopayController {
    constructor(private zalopayService: ZalopayService) { }
    // @Post('transfer')
    // async transfer(@Body() body: TransferDto) {
    //     return await this.zalopayService.transfer();
    // }
    // @Post()
    // async payment() {
    //     return await this.zalopayService.payment();
    // }
    @Post('')
    async verifyAccount() {
        return await this.zalopayService.verifyAccount();
    }
    @Post('callback')
    async callback(@Body() body) {
        const result = await this.zalopayService.callback(body);
        return result
    }

    @Post('checkstatus/:id')
    async checkStatus(@Param('id') id: string) {
        const result = await this.zalopayService.checkStatus(id);
        return result
    }
}
