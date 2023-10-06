import { Controller, Post, Get, Patch, Delete, Body, ValidationPipe, Query, Param, ParseIntPipe } from '@nestjs/common';
import { GetCouponsFilterDto } from '../dto/get-coupons-filter.dto';
import { Coupon } from '../model/coupon.entity';
import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { FeedbackDto } from '../dto/feedback.dto';
import { FeedbackService } from '../service/feedback.service';
import { User } from '../model/user.entity';
import { Feedback } from '../model/feedback.entity';
import { GetFeedbacksFilterDto } from '../dto/get-feedbacks-filter.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';


@Controller('feedback')
export class FeedbackController {

    constructor(
        private feedbackService: FeedbackService
    ) {}

    @Post()
    createFeedback(
        @Body(ValidationPipe) feedbackDto: FeedbackDto
    ): Promise<void> {
        return this.feedbackService.createFeedback(feedbackDto);
    }

    @Get()
    getFeedbacks(@Query(ValidationPipe) filterDto: GetFeedbacksFilterDto): Promise<Feedback[]> {
        return this.feedbackService.getFeedbacks(filterDto);
    }

    @Get('/:id')
    getFeedbackById(@Param('id', ParseIntPipe) id: number ): Promise<Feedback> {
        return this.feedbackService.getFeedbackById(id)
    }

    @Delete('/:id')
    deleteFeedback(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.feedbackService.deleteFeedback(id);
    }

    @Patch('/:id')
    updateFeedbackStatus(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) feedbackDto: UpdateFeedbackDto
    ): Promise<Feedback> {
        return this.feedbackService.updateFeedback(id, feedbackDto);
    }

}
