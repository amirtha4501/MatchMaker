import { Controller, Post, Get, Patch, Delete, Body, ValidationPipe, Param, ParseIntPipe } from '@nestjs/common';
import { TestimonialService } from '../service/testimonial.service';
import { TestimonialDto } from '../dto/testimonial.dto';
import { Testimonial } from '../model/testimonial.entity';
import { UpdateTestimonialDto } from '../dto/update-testimonial.dto';


@Controller('testimonial')
export class TestimonialController {

    constructor(
        private testimonialService: TestimonialService
    ) {}

    @Post()
    createTestimonial(
        @Body(ValidationPipe) testimonialDto: TestimonialDto
    ): Promise<void> {
        return this.testimonialService.createTestimonial(testimonialDto);
    }

    @Get()
    getTestimonials(): Promise<Testimonial[]> {
        return this.testimonialService.getTestimonials();
    }

    @Get('/:id')
    getTestimonialById(@Param('id', ParseIntPipe) id: number ): Promise<Testimonial> {
        return this.testimonialService.getTestimonialById(id)
    }

    @Delete('/:id')
    deleteTestimonial(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.testimonialService.deleteTestimonial(id);
    }

    @Patch('/:id')
    updateTestimonial(
        @Param('id', ParseIntPipe) id: number,
        @Body(ValidationPipe) testimonialDto: UpdateTestimonialDto
    ): Promise<Testimonial> {
        return this.testimonialService.updateTestimonial(id, testimonialDto);
    }

}
