import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { Feedback } from "../model/feedback.entity";
import { FeedbackDto } from "../dto/feedback.dto";
import { User } from "../model/user.entity";
import { GetFeedbacksFilterDto } from "../dto/get-feedbacks-filter.dto";


@EntityRepository(Feedback)
export class FeedbackRepository extends Repository<Feedback> {

    async createFeedback(feedbackDto: FeedbackDto, user: User): Promise<void> {
        const feedback = new Feedback();

        const { subject, comments, rating, status, feedback_type, feedback_date } = feedbackDto;

        feedback.subject = subject
        feedback.comments = comments
        feedback.rating = rating
        feedback.status = status
        feedback.feedback_type = feedback_type
        feedback.feedback_date = feedback_date
        feedback.user = user

        try {
            await feedback.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getFeedbacks(filterDto: GetFeedbacksFilterDto, user: User): Promise<Feedback[]> {
        const { subject, from_rating, to_rating, status } = filterDto;

        const query = this.createQueryBuilder('feedback');

        if (subject) {
            query.andWhere('feedback.subject LIKE :subject', { subject: `%${subject}%` });
        }

        if (status) {
            query.andWhere('feedback.status = :status', { status });
        }

        if (from_rating && to_rating) {
            query.andWhere('feedback.rating >= :from_rating AND feedback.rating <= :to_rating', { from_rating, to_rating });
        }

        if (user) {
            query.andWhere('feedback.user = :user', { user: user.user_id });
        }

        // Add ORDER BY clause to sort by feedback_id in ascending order
        query.orderBy('feedback.feedback_id', 'ASC');

        const feedbacks = await query.getMany();
        return feedbacks;
    }
}