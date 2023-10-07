import { IsNotEmpty } from 'class-validator';

export class PlanDto {

    @IsNotEmpty()
    plan_name: string;

    @IsNotEmpty()
    currency: string;

    @IsNotEmpty()
    price: number;

    description: string;

    @IsNotEmpty()
    billing_cycle: string;

    @IsNotEmpty()
    active: boolean;

}