import { EntityRepository, Repository } from "typeorm";
import { CouponDto } from "../dto/coupon.dto";
import { Coupon } from "../model/coupon.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { GetCouponsFilterDto } from "src/dto/get-coupons-filter.dto";


@EntityRepository(Coupon)
export class CouponRepository extends Repository<Coupon> {

    async createCoupon(couponDto: CouponDto): Promise<void> {
        const coupon = new Coupon();
        const { coupon_code, discount_amount, expiry_date, active, usage_limit } = couponDto;
        console.log("\n\n", coupon, active, typeof active);
        coupon.coupon_code = coupon_code
        coupon.discount_amount = discount_amount
        coupon.expiry_date = expiry_date
        coupon.usage_limit = usage_limit
        coupon.active = (`${active}` == "true") ? true : false;

        try {
            await coupon.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getCoupons(filterDto: GetCouponsFilterDto): Promise<Coupon[]> {
        const { coupon_code, from_amount, to_amount, expiry_date } = filterDto;

        console.log(filterDto);

        const query = this.createQueryBuilder('coupon');

        if (coupon_code) {
            query.andWhere('coupon.coupon_code LIKE :coupon_code', { coupon_code: `%${coupon_code}%` });
        }

        if (expiry_date) {
            query.andWhere('coupon.expiry_date = :expiry_date', { expiry_date });
        }

        if (from_amount && to_amount) {
            query.andWhere('coupon.discount_amount >= :from_amount AND coupon.discount_amount <= :to_amount', { from_amount, to_amount });
        }
        
        // Add ORDER BY clause to sort by coupon_id in ascending order
        query.orderBy('coupon.coupon_id', 'ASC');

        const coupons = await query.getMany();
        return coupons;
    }
}