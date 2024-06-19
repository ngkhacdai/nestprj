import { ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { Body, Controller, Param, Patch } from '@nestjs/common';

@ApiTags('user')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) { }

}
