import { IsString, MinLength, MaxLength, IsNotEmpty, IsOptional } from 'class-validator';

export class ProfileDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @IsNotEmpty()
    gender: string;
    
    @IsOptional()
    height: number;
    
    @IsNotEmpty()
    contact: string;

    user_id: number;

    img_data_1: string;
    img_data_2: string;
    img_data_3: string;
    qualification: string;
    job: string;
    religion: string;
    caste: string;
    birth_date: Date;
    birth_place: string;
    marital_status: string;
    star: string;
    rasi: string;
    income: string;
    father_name: string;
    mother_name: string;
    sibiling_count: string;
    family_status: string;
    mother_tongue: string;
    known_language: string; 
    expected_qualification: string;
    expected_place: string;
    expected_income: string;
    expected_caste: string;
    expected_subcaste: string;
    expected_marital_status: string;
    expected_age_difference: string;
    expected_height: string;
    expected_weight: string;
}