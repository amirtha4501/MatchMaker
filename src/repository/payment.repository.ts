import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../model/user.entity";
import { Payment } from "../model/payment.entity";
import { PaymentDto } from "../dto/payment.dto";
import { Plan } from "../model/plan.entity";


@EntityRepository(Payment)
export class PaymentRepository extends Repository<Payment> {

    async createPayment(paymentDto: PaymentDto, user: User, plan: Plan): Promise<void> {
        const payment = new Payment();

        const { amount, currency, payment_gateway, payment_method, transaction_id, status } = paymentDto;

        payment.amount = amount
        payment.currency = currency
        payment.payment_gateway = payment_gateway
        payment.payment_method = payment_method
        payment.transaction_id = transaction_id
        payment.status = status
        payment.user = user
        payment.plan = plan

        try {
            await payment.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getPayments(): Promise<Payment[]> {
        return await this.createQueryBuilder('payment')
            .leftJoinAndSelect('payment.user', 'user') // Join and select the 'user' relation
            .leftJoinAndSelect('payment.plan', 'plan') // Join and select the 'plan' relation
            .getMany();
    }

    // async getFeedbacks(filterDto: GetFeedbacksFilterDto, user: User): Promise<Feedback[]> {
    //     const { subject, from_rating, to_rating, status } = filterDto;

    //     const query = this.createQueryBuilder('feedback');

    //     if (subject) {
    //         query.andWhere('feedback.subject LIKE :subject', { subject: `%${subject}%` });
    //     }

    //     if (status) {
    //         query.andWhere('feedback.status = :status', { status });
    //     }

    //     if (from_rating && to_rating) {
    //         query.andWhere('feedback.rating >= :from_rating AND feedback.rating <= :to_rating', { from_rating, to_rating });
    //     }

    //     if (user) {
    //         query.andWhere('feedback.user = :user', { user: user.user_id });
    //     }

    //     const feedbacks = await query.getMany();
    //     return feedbacks;
    // }
}