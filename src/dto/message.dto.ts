import { IsNotEmpty } from 'class-validator';
import { User } from '../model/user.entity';

export class MessageDto {

    @IsNotEmpty()
    message_text: string;

    @IsNotEmpty()
    read_status: string;

    // @IsNotEmpty()
    attachment: string;

    @IsNotEmpty()
    sender_id: number;

    @IsNotEmpty()
    receiver_id: number;

}