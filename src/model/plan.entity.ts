import { BaseEntity, Column, Entity, ManyToMany, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ nullable: true })
    description: string;

    @Column()
    billing_cycle: string;

    @Column()
    active: boolean;

    @Column()
    @CreateDateColumn()
    created_date: Date;

    @Column()
    @UpdateDateColumn()
    updated_date: Date;

    // Define the many-to-many relationship with the Coupon entity
    @ManyToMany(() => Coupon, coupon => coupon.plans)
    // @JoinTable()
    coupons: Coupon[];

    // Define the one-to-many relationship with the Payment entity
    @OneToMany(() => Payment, payment => payment.plan)
    payments: Payment[];

    // Define the one-to-many relationship with the User entity
    @OneToMany(() => User, user => user.plan)
    users: User[];
}