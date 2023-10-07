import { BaseEntity, Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";


@Entity()
export class Message extends BaseEntity {

    @PrimaryGeneratedColumn()
    message_id: number;

    @Column()
    message_text: string;

    @Column()
    read_status: string;

    @Column()
    @CreateDateColumn()
    timestamp: Date;

    @Column({ nullable: true })
    attachment: string;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.sender_messages)
    sender: User;

    @ManyToOne(() => User, user => user.receiver_messages)
    receiver: User;
}