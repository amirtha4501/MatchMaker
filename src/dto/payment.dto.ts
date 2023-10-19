import { IsNotEmpty } from 'class-validator';

export class PaymentDto {

    @IsNotEmpty()
    amount: number;

    @IsNotEmpty()
    currency: string;

    // @IsNotEmpty()
    payment_gateway: string;

    // @IsNotEmpty()
    payment_method: string;

    @IsNotEmpty()
    status: string;

    // @IsNotEmpty()
    // payment_date: Date;

    @IsNotEmpty()
    transaction_id: string;

    @IsNotEmpty()
    user_id: number;

    @IsNotEmpty()
    plan_id: number;

}