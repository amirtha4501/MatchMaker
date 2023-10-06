import { Controller, Post, Get, Patch, Delete, Body, ValidationPipe, Query, Param, ParseIntPipe } from '@nestjs/common';
import { CouponService } from '../service/coupon.service';
import { GetCouponsFilterDto } from '../dto/get-coupons-filter.dto';
import { Coupon } from '../model/coupon.entity';
import { CouponDto } from '../dto/coupon.dto';
import { UpdateCouponDto } from '../dto/update-coupon.dto';

@Controller('coupon')
export class CouponController {

    constructor(
        private couponService: CouponService
    ) {}

    @Post()
    createCoupon(@Body(ValidationPipe) couponDto: CouponDto): Promise<void> {
        return this.couponService.createCoupon(couponDto);
    }

    @Get()
    getCoupons(@Query(ValidationPipe) filterDto: GetCouponsFilterDto): Promise<Coupon[]> {
        return this.couponService.getCoupons(filterDto);
    }

    @Get('/:id')
    getCouponById(@Param('id', ParseIntPipe) id: number ): Promise<Coupon> {
        return this.couponService.getCouponById(id)
    }

    // @UseGuards(AuthGuard())
    @Delete('/:id')
    deleteCoupon(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.couponService.deleteCoupon(id);
    }

    @Patch('/:id')
    updateCouponStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) couponDto: UpdateCouponDto
    ): Promise<Coupon> {
        return this.couponService.updateCoupon(id, couponDto);
    }

}
