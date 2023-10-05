import { IsOptional, IsNotEmpty, IsString } from 'class-validator';

export class GetProfilesFilterDto {
    
    @IsOptional()
    @IsNotEmpty()
    id: string;

    @IsString()
    @IsOptional()
    @IsNotEmpty()
    name: string;
    
    @IsOptional()
    @IsNotEmpty()
    caste: string;
        
    @IsOptional()
    @IsNotEmpty()
    gender: string;

    @IsOptional()
    @IsNotEmpty()
    from_age: number;

    @IsOptional()
    @IsNotEmpty()
    to_age: number;

    @IsOptional()
    @IsNotEmpty()
    from_height: number;

    @IsOptional()
    @IsNotEmpty()
    to_height: number;

}