// import { TransferDto } from './dto/transfer.dto';
import { ApiTags } from '@nestjs/swagger';
import { ZalopayService } from './zalopay.service';
import { Body, Controller, Param, Post } from '@nestjs/common';

@ApiTags('zalopay')
@Controller('zalopay')
export class ZalopayController {
    constructor(private zalopayService: ZalopayService) { }
    @Post()
    async withDrawMoney() {
        return await this.zalopayService.withDrawMoney();
    }
    @Post('verifyaccount')
    async verifyAccount() {
        return await this.zalopayService.verifyAccount();
    }
    @Post('callback')
    async callback(@Body() body) {
        //log body callbakc 
        console.log(body);
        
        const result = await this.zalopayService.callback(body);
        return result
    }

    @Post('checkstatus/:id')
    async checkStatus(@Param('id') id: string) {
        const result = await this.zalopayService.checkStatus(id);
        return result
    }
}
