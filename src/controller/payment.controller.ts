import { Controller, Post, Body, ValidationPipe, Get } from '@nestjs/common';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentService } from '../service/payment.service';
import { Payment } from '../model/payment.entity';


@Controller('payment')
export class PaymentController {

    constructor(
        private paymentService: PaymentService
    ) {}

    @Post()
    createPayment(
        @Body(ValidationPipe) paymentDto: PaymentDto
    ): Promise<void> {
        return this.paymentService.createPayment(paymentDto);
    }

    @Get()
    getPayments(
        // @Body(ValidationPipe) paymentDto: PaymentDto
    ): Promise<Payment[]> {
        return this.paymentService.getPayments();
    }

}
