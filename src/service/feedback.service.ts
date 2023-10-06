import { Injectable, NotFoundException } from '@nestjs/common';
import { GetCouponsFilterDto } from '../dto/get-coupons-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CouponDto } from '../dto/coupon.dto';
import { Coupon } from '../model/coupon.entity';
import { UpdateCouponDto } from '../dto/update-coupon.dto';
import { FeedbackRepository } from '../repository/feedback.repository';
import { FeedbackDto } from '../dto/feedback.dto';
import { User } from '../model/user.entity';
import { AuthRepository } from '../repository/auth.repository';
import { Feedback } from '../model/feedback.entity';
import { GetFeedbacksFilterDto } from '../dto/get-feedbacks-filter.dto';
import { UpdateFeedbackDto } from '../dto/update-feedback.dto';

@Injectable()
export class FeedbackService {
    constructor(
        @InjectRepository(FeedbackRepository)
        private feedbackRepository: FeedbackRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createFeedback(feedbackDto: FeedbackDto): Promise<void> {
        const user = await this.authRepository.findOne(feedbackDto.user_id);
        return this.feedbackRepository.createFeedback(feedbackDto, user);
    }

    async getFeedbacks(filterDto: GetFeedbacksFilterDto): Promise<Feedback[]> {

        const user = (filterDto.user_id) ? await this.authRepository.findOne(filterDto.user_id) : null;
        return this.feedbackRepository.getFeedbacks(filterDto, user);
    }

    async getFeedbackById(id: number): Promise<Feedback> {
        const found = await this.feedbackRepository.findOne(id);
        if(!found) {
            throw new NotFoundException(`Feedback with ID '${id}' not found`);
        }

        return found;
    }

    async deleteFeedback( id: number ): Promise<void> {

        const result = await this.feedbackRepository.delete(id);
        if(result.affected === 0) {
            throw new NotFoundException(`Feedback ID ${id} not found to delete`);
        }
    }

    async updateFeedback(
        id: number,
        couponDto: UpdateFeedbackDto
    ): Promise<Feedback> {
        const feedback = await this.getFeedbackById(id);
        const { subject, comments, rating, status, feedback_type } = couponDto;

        feedback.subject = subject
        feedback.comments = comments
        feedback.rating = rating
        feedback.status = status
        feedback.feedback_type = feedback_type

        await feedback.save()
        return feedback;
    }

}
