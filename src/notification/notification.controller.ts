import { ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Controller, Post } from '@nestjs/common';

@Controller('notification')
export class NotificationController {
    constructor(private notificationService: NotificationService) { }

}
