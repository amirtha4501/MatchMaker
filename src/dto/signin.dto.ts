import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class SigninDto {

    @IsOptional()
    @IsNotEmpty()
    user_id: number;

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    // user_type: string;
    // paid_status: string;
}