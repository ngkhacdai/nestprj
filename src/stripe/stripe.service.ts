import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
    private stripe;

    constructor() {
        this.stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
            apiVersion: '2024-06-20'
        })
    }

    async checkOut(totalPrice: number) {
        return this.stripe.paymentIntents.create({
            amount: totalPrice,
            currency: 'vnd',
            payment_method_types: ['card'],
        })
    }
}
