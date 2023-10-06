import { IsNotEmpty } from 'class-validator';

export class CouponDto {

    @IsNotEmpty()
    coupon_code: string;

    @IsNotEmpty()
    discount_amount: number;
    
    @IsNotEmpty()
    usage_limit: number;

    @IsNotEmpty()
    active: boolean;

    @IsNotEmpty()
    expiry_date: Date;

}