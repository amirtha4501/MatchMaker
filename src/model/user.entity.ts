import { IsEmail } from "class-validator";
import { BaseEntity, Column, Entity, ManyToMany, OneToMany, JoinTable, ManyToOne, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Coupon } from "./coupon.entity";
import { Feedback } from "./feedback.entity";
import { Payment } from "./payment.entity";
import { Plan } from "./plan.entity";
import { Testimonial } from "./testimonial.entity";
import { Message } from "./message.entity";
import { Profile } from "./profile.entity";
// import * as bcrypt from 'bcrypt';
// import { Category } from "../entity/category.entity";

@Entity()
@Unique(['email'])
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    user_id: number;

    @Column()
    user_name: string;

    @Column()
    @IsEmail({}, { message: 'Incorrect email' })
    email: string;

    @Column()
    password: string;

    @Column()
    paid_status: string;

    @Column()
    user_type: string;

    // Define the many-to-many relationship with the Coupon entity
    @ManyToMany(() => Coupon, coupon => coupon.users)
    // @JoinTable()
    coupons: Coupon[];

    // Define the one-to-many relationship with the Feedback entity
    @OneToMany(() => Feedback, feedback => feedback.user)
    feedback: Feedback[];

    // Define the one-to-many relationship with the Payment entity
    @OneToMany(() => Payment, payment => payment.user)
    payments: Payment[];

    // Define the many-to-one relationship with the Plan entity
    @ManyToOne(() => Plan, plan => plan.users)
    plan: Plan;

    // Define the one-to-many relationship with the Testimonial entity
    @OneToMany(() => Testimonial, testimonial => testimonial.user)
    testimonials: Testimonial[];

    // Define the one-to-many relationship with the Message entity for sender
    @OneToMany(() => Message, message => message.sender)
    sender_messages: Message[];

    // Define the one-to-many relationship with the Message entity for receiver
    @OneToMany(() => Message, message => message.receiver)
    receiver_messages: Message[];

    // Define the one-to-many relationship with the Profile entity
    @OneToMany(() => Profile, profile => profile.user)
    profiles: Profile[];

    async validatePassword(password: string): Promise<boolean> {
        // const hash = await bcrypt.hash(password, this.salt);
        return password === this.password;
    }
}