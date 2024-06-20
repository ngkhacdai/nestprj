import { Body, Controller, Patch, Post, Put, Req, UploadedFile, UseGuards, UseInterceptors, ValidationPipe } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { InformationService } from './information.service';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateInformationDto } from './dto/create-information.dto';
import { Request } from 'express';
import { RolesGuard } from 'src/auth/gruards/role.gruard';
import { Roles } from 'src/auth/role.decorator';

@ApiTags('information')
@Controller('information')
export class InformationController {
    constructor(private informationService: InformationService) { }

    @Put('')
    @UseGuards(JwtGruard)
    @ApiBearerAuth()
    @UseInterceptors(FileInterceptor('avatar'))
    @ApiBody({ type: CreateInformationDto })
    async updateUserInformation(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Body(ValidationPipe) body: CreateInformationDto) {
        const user = await this.informationService.createInformation(file, body, req.user)
        return user
    }

    @Patch(':id')
    @UseGuards(JwtGruard, RolesGuard)
    @ApiBearerAuth()
    @Roles('User')
    @UseInterceptors(FileInterceptor('avatar'))
    async updateUser(@UploadedFile() file: Express.Multer.File, @Req() req: Request, @Body(ValidationPipe) body: CreateInformationDto) {
        const user = await this.informationService.updateUser(file, body, req.user)
        return user
    }
}
