import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Plan } from "./plan.entity";


@Entity()
export class Payment extends BaseEntity {

    @PrimaryGeneratedColumn()
    payment_id: number;

    @Column()
    amount: number;

    @Column()
    currency: string;

    @Column({ nullable: true })
    payment_gateway: string;

    @Column({ nullable: true })
    payment_method: string;

    @Column()
    status: string;

    @Column()
    @CreateDateColumn()
    payment_date: Date;

    @Column()
    transaction_id: string;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.payments)
    user: User;

    // Define the many-to-one relationship with the Plan entity
    @ManyToOne(() => Plan, plan => plan.payments)
    plan: Plan;
}