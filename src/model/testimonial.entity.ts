import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Testimonial extends BaseEntity {

    @PrimaryGeneratedColumn()
    testimonial_id: number;

    @Column()
    testimonial_text: string;

    @Column({ nullable: true, default: false })
    approved: boolean;

    @Column()
    rating: number;

    @Column()
    relationship_length: number;

    @Column()
    @CreateDateColumn()
    submit_date: Date;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.testimonials)
    user: User;

}