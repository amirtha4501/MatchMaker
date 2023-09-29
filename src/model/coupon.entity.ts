import { BaseEntity, Column, Entity, ManyToMany, JoinTable, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Plan } from "./plan.entity";


@Entity()
export class Coupon extends BaseEntity {

    @PrimaryGeneratedColumn()
    coupon_id: number;

    @Column()
    coupon_code: string;

    @Column()
    discount_amount: number;

    @Column()
    usage_limit: number;

    @Column({ default: false })
    active: boolean;

    @Column()
    expiry_date: Date;

    // Define the many-to-many relationship with the User entity
    @ManyToMany(() => User, user => user.coupons)
    @JoinTable()
    users: User[];

    // Define the many-to-many relationship with the Plan entity
    @ManyToMany(() => Plan, plan => plan.coupons)
    @JoinTable()
    plans: Plan[];
}