import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
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
    timestamp: Date;

    @Column()
    attachment: string;

    // Define the many-to-one relationship with the User entity
    @ManyToOne(() => User, user => user.messages)
    user: User;
}