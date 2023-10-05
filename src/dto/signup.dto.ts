import { IsNotEmpty, IsString } from 'class-validator';

export class SignupDto {

    @IsString()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    user_type: string;

    paid_status: string;

}