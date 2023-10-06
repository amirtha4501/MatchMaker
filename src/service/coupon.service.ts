import { Injectable, NotFoundException } from '@nestjs/common';
import { GetCouponsFilterDto } from '../dto/get-coupons-filter.dto';
import { CouponRepository } from '../repository/coupon.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponDto } from '../dto/coupon.dto';
import { Coupon } from '../model/coupon.entity';
import { UpdateCouponDto } from '../dto/update-coupon.dto';

@Injectable()
export class CouponService {
    constructor(
        @InjectRepository(CouponRepository)
        private couponRepository: CouponRepository,
        // @InjectRepository(AuthRepository)
        // private authRepository: AuthRepository
    ) {}

    async createCoupon(couponDto: CouponDto): Promise<void> {
        console.log("Coupon", couponDto);
        return this.couponRepository.createCoupon(couponDto);
    }

    async getCoupons(filterDto: GetCouponsFilterDto): Promise<Coupon[]> {
        return this.couponRepository.getCoupons(filterDto);
    }

    async getCouponById(id: number): Promise<Coupon> {
        const found = await this.couponRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Coupon with ID '${id}' not found`);
        }

        return found;
    }

    async deleteCoupon( id: number ): Promise<void> {

        const result = await this.couponRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Coupon ID ${id} not found to delete`);
        }
    }

    async updateCoupon(
        id: number,
        couponDto: UpdateCouponDto
    ): Promise<Coupon> {
        const coupon = await this.getCouponById(id);
        const { coupon_code, active, expiry_date, usage_limit, discount_amount } = couponDto;

        coupon.coupon_code = coupon_code
        coupon.active = active
        coupon.expiry_date = expiry_date
        coupon.usage_limit = usage_limit
        coupon.discount_amount = discount_amount
    

        await coupon.save()
        return coupon;
    }

}
