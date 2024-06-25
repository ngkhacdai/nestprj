import { Controller, Post } from '@nestjs/common';
import { StripeService } from './stripe.service';

@Controller('stripe')
export class StripeController {

    constructor(private stripeService: StripeService) { }
    // @Post()
    // checkOut() {
    //     return this.stripeService.checkOut()
    // }
}
