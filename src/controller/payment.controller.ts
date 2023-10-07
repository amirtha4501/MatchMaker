import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { PaymentDto } from '../dto/payment.dto';
import { PaymentService } from '../service/payment.service';


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

}
