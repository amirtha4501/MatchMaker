import { IsNotEmpty } from 'class-validator';

export class TestimonialDto {

    @IsNotEmpty()
    testimonial_text: string;
    
    approved: boolean;

    @IsNotEmpty()
    rating: number;
    
    @IsNotEmpty()
    relationship_length: number;

    @IsNotEmpty()
    user_id: number;

}