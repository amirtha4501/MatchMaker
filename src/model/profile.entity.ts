import { BaseEntity, Column, PrimaryGeneratedColumn, ManyToOne, Entity, CreateDateColumn } from "typeorm";
import { User } from "./user.entity";
// import { IsOptional } from "class-validator";

// profile_id	name	gender	qualification	job	religion	caste	birth_date	birth_place	marital_status	height	star	rasi	income	contact	father_name	mother_name	sibling_count	family_status	mother_tongue	known_language	expected_qualification	expected_place	expected_income	expected_caste	expected_subcaste	expected_marital_status	expected_age_difference	expected_height	expected_weight	user_id
@Entity()
export class Profile extends BaseEntity {

    @PrimaryGeneratedColumn()
    profile_id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    gender: string; //

    @Column({ nullable: true })
    qualification: string;

    @Column({ nullable: true })
    job: string;

    @Column({ nullable: true })
    religion: string;

    // @Column({ nullable: true })
    // division: string;

    @Column({ nullable: true })
    caste: string;

    @Column({  type: 'date', nullable: true })
    dob: string;

    @Column({ nullable: true })
    birth_time: string;

    @Column({ nullable: true })
    birth_place: string;

    @Column({ nullable: true })
    marital_status: string;

    @Column({ type: "decimal", nullable: true })
    height: number;
    
    // @Column({ type: "decimal", nullable: true })
    // weight: number;

    @Column({ nullable: true })
    star: string;
    
    @Column({ nullable: true })
    rasi: string;
    
    // @Column({ nullable: true })
    // workplace: string;
    
    @Column({ nullable: true })
    income: string;

    @Column({ nullable: false })
    contact: string;
    
    // @Column({ nullable: true })
    // // @IsOptional()
    // contact_sup: string;

    @Column({ nullable: true })
    father_name: string;
    
    // @Column({ nullable: true })
    // father_occupation: string;
    
    @Column({ nullable: true })
    mother_name: string;
    
    // @Column({ nullable: true })
    // mother_occupation: string;
    
    @Column({ nullable: true })
    sibiling_count: string;
    
    @Column({ nullable: true })
    family_status: string;

    @Column({ nullable: true })
    mother_tongue: string;
    
    @Column({ nullable: true })
    known_language: string;

    // Partner Expectations

    @Column({ nullable: true })
    expected_qualification: string;
    
    @Column({ nullable: true })
    expected_place: string;
    
    @Column({ nullable: true })
    expected_income: string;
    
    @Column({ nullable: true })
    expected_caste: string;
    
    @Column({ nullable: true })
    expected_subcaste: string;
    
    @Column({ nullable: true })
    expected_marital_status: string;
    
    @Column({ nullable: true })
    expected_age_difference: string;
    
    @Column({ nullable: true })
    expected_height: string;
    
    @Column({ nullable: true })
    expected_weight: string;

    @Column("text", { nullable: true })
    img_data_1: string;
    
    @Column("text", { nullable: true })
    img_data_2: string;

    @Column("text", { nullable: true })
    img_data_3: string;
    
    @Column({default: 0})
    viewed_contacts: number;

    @CreateDateColumn({ type: 'date', default: () => 'CURRENT_TIMESTAMP' })
    date_of_registration: Date;

    @Column({ nullable: true })
    age: number;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.profiles)
    user: User;

    /*
    @Column({ nullable: true })
    subcaste: string;
    
    @Column({ nullable: true })
    gothram: string;

    @Column({ nullable: true })
    talents: string;
    
    @Column({ nullable: true })
    hobbies: string;
    
    @Column({ nullable: true })
    vehicle_driving: string;
    
    @Column({ nullable: true })
    disabilities: string;

    @Column({ nullable: true })
    properties: string;
    
    @Column({ nullable: true })
    other_details: string;

    @Column({ nullable: true })
    expectations: string;
    */

/*
    // Horoscope details

    // Rasi
    
    @Column({ nullable: true })
    rasibox11: string;
    
    @Column({ nullable: true })
    rasibox12: string;
    
    @Column({ nullable: true })
    rasibox13: string;
    
    @Column({ nullable: true })
    rasibox14: string;
    
    @Column({ nullable: true })
    rasibox15: string;
    
    @Column({ nullable: true })
    rasibox16: string;
    
    @Column({ nullable: true })
    rasibox17: string;
    
    @Column({ nullable: true })
    rasibox18: string;
    
    @Column({ nullable: true })
    rasibox19: string;
    
    @Column({ nullable: true })
    rasibox110: string;
    
    @Column({ nullable: true })
    rasibox111: string;
    
    @Column({ nullable: true })
    rasibox112: string;
    
    // Navamsam
    
    @Column({ nullable: true })
    rasibox21: string;
    
    @Column({ nullable: true })
    rasibox22: string;
    
    @Column({ nullable: true })
    rasibox23: string;
    
    @Column({ nullable: true })
    rasibox24: string;
    
    @Column({ nullable: true })
    rasibox25: string;
    
    @Column({ nullable: true })
    rasibox26: string;
    
    @Column({ nullable: true })
    rasibox27: string;
    
    @Column({ nullable: true })
    rasibox28: string;
    
    @Column({ nullable: true })
    rasibox29: string;
    
    @Column({ nullable: true })
    rasibox210: string;
    
    @Column({ nullable: true })
    rasibox211: string;
    
    @Column({ nullable: true })
    rasibox212: string;

*/
}