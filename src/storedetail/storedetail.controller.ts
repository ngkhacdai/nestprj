import { StoredetailService } from './storedetail.service';
import { BadRequestException, Body, Controller, Put, Req, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { StoreDetailDto } from './dto/create-storedetail.dto';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';
import { RolesGuard } from 'src/auth/gruards/role.gruard';
import { Roles } from 'src/auth/role.decorator';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';

@ApiTags('storedetail')
@Controller('storedetail')
export class StoredetailController {
    constructor(private storedetailService: StoredetailService) { }
    @Put('')
    @UseGuards(JwtGruard, RolesGuard)
    @Roles("Shop")
    @ApiBearerAuth()
    @ApiBody({ type: StoreDetailDto })
    @ApiConsumes('multipart/form-data')
    @UseInterceptors(FileInterceptor('file'))
    async updateStoreDetail(@Body(ValidationPipe) body: StoreDetailDto, @Req() req: Request) {
        if (!req.file) {
            throw new BadRequestException('Please select image')
        }
        return await this.storedetailService.updateStoreDetail(req.file, body, req.user)
    }
}
