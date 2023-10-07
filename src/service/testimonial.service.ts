import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { TestimonialRepository } from '../repository/testimonial.repository';
import { TestimonialDto } from '../dto/testimonial.dto';
import { Testimonial } from '../model/testimonial.entity';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';

@Injectable()
export class TestimonialService {
    constructor(
        @InjectRepository(TestimonialRepository)
        private testimonialRepository: TestimonialRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) { }

    async createTestimonial(testimonialDto: TestimonialDto): Promise<void> {
        const user = await this.authRepository.findOne(testimonialDto.user_id);
        if (user?.user_id) {
            return this.testimonialRepository.createTestimonial(testimonialDto, user);
        } else {
            throw new NotFoundException("User id not exists");
        }
    }

    async getTestimonials(): Promise<Testimonial[]> {
        // const user = (filterDto.user_id) ? await this.authRepository.findOne(filterDto.user_id) : null;
        return this.testimonialRepository.getTestimonials();
    }

    async getTestimonialById(id: number): Promise<Testimonial> {
        const found = await this.testimonialRepository.findOne(id);
        if (!found) {
            throw new NotFoundException(`Testimonial with ID '${id}' not found`);
        }

        return found;
    }

    async deleteTestimonial(id: number): Promise<void> {

        const result = await this.testimonialRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Testimonial ID ${id} not found to delete`);
        }
    }

    async updateTestimonial(
        id: number,
        testimonialDto: UpdateTestimonialDto
    ): Promise<Testimonial> {
        const testimonial = await this.getTestimonialById(id);
        const { testimonial_text, approved, rating, relationship_length } = testimonialDto;

        testimonial.testimonial_text = testimonial_text
        testimonial.approved = approved
        testimonial.rating = rating
        testimonial.relationship_length = relationship_length

        await testimonial.save()
        return testimonial;
    }

}
