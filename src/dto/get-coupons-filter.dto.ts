import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class GetCouponsFilterDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    coupon_code: string;

    @IsOptional()
    @IsNotEmpty()
    from_amount: number;

    @IsOptional()
    @IsNotEmpty()
    to_amount: number;

    @IsOptional()
    @IsNotEmpty()
    expiry_date: Date;

}