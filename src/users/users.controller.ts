import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtGruard } from 'src/auth/gruards/jwt.gruard';

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }
    @Get('')
    findAll() {
        return this.usersService.findAll()
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
        return this.usersService.findOne(id)
    }
    @Post()
    @UseGuards(JwtGruard)
    @ApiBody({ type: CreateUser })
    @ApiBearerAuth()
    create(@Body(ValidationPipe) createUser: CreateUser) {
        return this.usersService.create(createUser)
    }
    @Patch(':id')
    update(@Param('id', ParseIntPipe) id: Number, @Body(ValidationPipe) updateUser: UpdateUser) {
        return this.usersService.update(id, updateUser)
    }
    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id: number) {
        return { id };
    }
}
