import { IsNotEmpty } from 'class-validator';

export class FeedbackDto {

    @IsNotEmpty()
    subject: string;
    
    @IsNotEmpty()
    comments: string;

    @IsNotEmpty()
    rating: number;
    
    @IsNotEmpty()
    status: string;
    
    @IsNotEmpty()
    feedback_type: string;

    @IsNotEmpty()
    feedback_date: Date;

    @IsNotEmpty()
    user_id: number;

}