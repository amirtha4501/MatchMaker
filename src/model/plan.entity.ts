import { BaseEntity, Column, Entity, ManyToMany, JoinTable, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Coupon } from "./coupon.entity";
import { Payment } from "./payment.entity";
import { User } from "./user.entity";


@Entity()
export class Plan extends BaseEntity {

    @PrimaryGeneratedColumn()
    plan_id: number;

    @Column()
    plan_name: string;

    @Column()
    currency: string;

    @Column()
    price: number;

    @Column()
    description: string;

    @Column()
    billing_cycle: string;

    @Column()
    active: string;

    @Column()
    created_date: Date;

    @Column()
    updated_date: Date;

    // Define the many-to-many relationship with the Coupon entity
    @ManyToMany(() => Coupon, coupon => coupon.plans)
    @JoinTable()
    coupons: Coupon[];

    // Define the one-to-many relationship with the Payment entity
    @OneToMany(() => Payment, payment => payment.plan)
    payments: Payment[];

    // Define the one-to-many relationship with the User entity
    @OneToMany(() => User, user => user.plan)
    users: User[];
}