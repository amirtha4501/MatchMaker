import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class GetFeedbacksFilterDto {

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    subject: string;

    @IsOptional()
    @IsNotEmpty()
    from_rating: number;

    @IsOptional()
    @IsNotEmpty()
    to_rating: number;

    @IsOptional()
    @IsNotEmpty()
    status: string;

    @IsOptional()
    @IsNotEmpty()
    user_id: number;

}