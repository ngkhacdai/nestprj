import { AppGateway } from './app/app.gateway';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  constructor(private appGateway: AppGateway) { }
  getHello(): string {
    return 'Hello World!!!!!';
  }
}
