import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { PaymentRepository } from '../repository/payment.repository';
import { PaymentDto } from '../dto/payment.dto';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(PaymentRepository)
        private paymentRepository: PaymentRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createPayment(paymentDto: PaymentDto): Promise<void> {
        const user = await this.authRepository.findOne(paymentDto.user_id);
        let plan;
        // const plan = await this.authRepository.findOne(paymentDto.plan_id);
        return this.paymentRepository.createPayment(paymentDto, user, plan);
    }

}
