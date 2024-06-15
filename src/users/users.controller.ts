import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, ValidationPipe } from '@nestjs/common';

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
