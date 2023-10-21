import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { Feedback } from "../model/feedback.entity";
import { FeedbackDto } from "../dto/feedback.dto";
import { User } from "../model/user.entity";
import { GetFeedbacksFilterDto } from "../dto/get-feedbacks-filter.dto";
import { Testimonial } from "../model/testimonial.entity";
import { TestimonialDto } from "../dto/testimonial.dto";


@EntityRepository(Testimonial)
export class TestimonialRepository extends Repository<Testimonial> {

    async createTestimonial(testimonialDto: TestimonialDto, user: User): Promise<void> {
        const testimonial = new Testimonial();

        const { testimonial_text, approved, rating, relationship_length } = testimonialDto;

        testimonial.testimonial_text = testimonial_text
        testimonial.approved = approved
        testimonial.rating = rating
        testimonial.relationship_length = relationship_length
        testimonial.user = user

        console.log(testimonial);

        try {
            await testimonial.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getTestimonials(): Promise<Testimonial[]> {

        const query = this.createQueryBuilder('testimonial');

        // Add ORDER BY clause to sort by testimonial_id in ascending order
        query.orderBy('testimonial.testimonial_id', 'ASC');

        const testimonials = await query.getMany();
        return testimonials;
    }
}