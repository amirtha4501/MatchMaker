import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Feedback extends BaseEntity {

    @PrimaryGeneratedColumn()
    feedback_id: number;

    @Column()
    subject: string;

    @Column()
    comments: string;

    @Column()
    rating: number;

    @Column()
    status: string;

    @Column()
    feedback_type: string;

    @Column()
    feedback_date: Date;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.feedback)
    user: User;

}