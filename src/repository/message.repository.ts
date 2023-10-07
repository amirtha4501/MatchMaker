import { EntityRepository, Repository } from "typeorm";
import { InternalServerErrorException } from "@nestjs/common";
import { User } from "../model/user.entity";
import { Message } from "../model/message.entity";
import { MessageDto } from "../dto/message.dto";


@EntityRepository(Message)
export class MessageRepository extends Repository<Message> {

    async createMessage(messageDto: MessageDto, sender: User, receiver: User): Promise<void> {
        const message = new Message();

        const { message_text, read_status, attachment } = messageDto;

        message.message_text = message_text
        message.read_status = read_status
        message.attachment = attachment
        message.sender = sender
        message.receiver = receiver

        console.log(message, messageDto);

        if (!message.sender || !message.receiver) {
            throw new InternalServerErrorException("Sender or receiver not found");
        }

        try {
            await message.save();
        } catch (error) {
            console.log(error);
            throw new InternalServerErrorException();
        }
    }

    async getMessages(sender: User, receiver: User): Promise<Message[]> {

        const query = this.createQueryBuilder('message');

        if (sender && receiver) {
            query.andWhere('message.sender = :sender AND message.receiver = :receiver', { sender: sender.user_id, receiver: receiver.user_id });
        }

        const messages = await query.getMany();
        return messages;
    }
}