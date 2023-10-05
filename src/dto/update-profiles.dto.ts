import { IsOptional } from 'class-validator';

export class UpdateProfileDto {

    // For storing personal details

    image: string;

    image1: string;

    image2: string;

    name: string;
  
    email: string;
      
    gender: string;
  
    age: number;
      
    dob: string;
  
    password: string;
    
    birth_time: string;
      
    birth_place: string;
      
    religion: string;
    
    division: string;
    
    caste: string;
      
    subcaste: string;
      
    gothram: string;
      
    star: string;

    rasi: string;
      
    qualification: string;
      
    job: string;
      
    workplace: string;
      
    income: string;
      
    @IsOptional()
    height: number;
      
    @IsOptional()
    weight: number;
      
    mother_tongue: string;
      
    known_language: string;
      
    marital_status: string;
      
    talents: string;
      
    hobbies: string;
      
    vehicle_driving: string;
      
    disabilities: string;


    // Horoscope details

    // Rasi
    
    rasibox11: string;
    
    rasibox12: string;
    
    rasibox13: string;
    
    rasibox14: string;
    
    rasibox15: string;
    
    rasibox16: string;
    
    rasibox17: string;
    
    rasibox18: string;
    
    rasibox19: string;
    
    rasibox110: string;
    
    rasibox111: string;
    
    rasibox112: string;
    
    // Navamsam
    
    rasibox21: string;
    
    rasibox22: string;
    
    rasibox23: string;
    
    rasibox24: string;
    
    rasibox25: string;
    
    rasibox26: string;
    
    rasibox27: string;
    
    rasibox28: string;
    
    rasibox29: string;
    
    rasibox210: string;
    
    rasibox211: string;
    
    rasibox212: string;



    // For storing family details
 
    father_name: string;
     
    father_occupation: string;
     
    mother_name: string;
     
    mother_occupation: string;
     
    contact_main: string;
    
    contact_sup: string;
     
    sibiling_count: string;
     
    family_status: string;
     
    properties: string;
     
    other_details: string;


    // Partner Expectations
 
    expected_qualification: string;
     
    expected_place: string;
     
    expected_income: string;
     
    expected_caste: string;
     
    expected_subcaste: string;
     
    expected_marital_status: string;
     
    age_difference: string;
     
    expected_height: string;
     
    expected_weight: string;
     
    expectations: string;
}