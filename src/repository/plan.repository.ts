import { EntityRepository, Repository } from "typeorm";
import { CouponDto } from "../dto/coupon.dto";
import { Coupon } from "../model/coupon.entity";
import { InternalServerErrorException } from "@nestjs/common";
import { GetCouponsFilterDto } from "../dto/get-coupons-filter.dto";
import { PlanDto } from "../dto/plan.dto";
import { Plan } from "../model/plan.entity";


@EntityRepository(Plan)
export class PlanRepository extends Repository<Plan> {

    async createPlan(couponDto: PlanDto): Promise<void> {
        const plan = new Plan();
        const { plan_name, currency, price, description, billing_cycle, active } = couponDto;

        console.log("\n\n", plan, active, typeof active);
        plan.plan_name = plan_name
        plan.currency = currency
        plan.price = price
        plan.description = description
        plan.billing_cycle = billing_cycle
        plan.active = (`${active}` == "true") ? true : false;

        try {
            await plan.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getPlans(): Promise<Plan[]> {

        const query = this.createQueryBuilder('plan');

        // if (coupon_code) {
        //     query.andWhere('coupon.coupon_code LIKE :coupon_code', { coupon_code: `%${coupon_code}%` });
        // }

        // if (expiry_date) {
        //     query.andWhere('coupon.expiry_date = :expiry_date', { expiry_date });
        // }

        // if (from_amount && to_amount) {
        //     query.andWhere('coupon.discount_amount >= :from_amount AND coupon.discount_amount <= :to_amount', { from_amount, to_amount });
        // }

        const plans = await query.getMany();
        return plans;
    }
}