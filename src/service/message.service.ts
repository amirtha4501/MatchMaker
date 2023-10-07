import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from '../repository/auth.repository';
import { MessageRepository } from '../repository/message.repository';
import { MessageDto } from '../dto/message.dto';
import { Message } from '../model/message.entity';
import { GetMessagesFilterDto } from '../dto/get-messages-filter.dto';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(MessageRepository)
        private messageRepository: MessageRepository,
        @InjectRepository(AuthRepository)
        private authRepository: AuthRepository
    ) {}

    async createMessage(messageDto: MessageDto): Promise<void> {
        const sender = await this.authRepository.findOne(messageDto.sender_id);
        const receiver = await this.authRepository.findOne(messageDto.receiver_id);
        return this.messageRepository.createMessage(messageDto, sender, receiver);
    }

    async getMessages(filterDto: GetMessagesFilterDto): Promise<Message[]> {
        const sender = await this.authRepository.findOne(filterDto.sender_id);
        const receiver = await this.authRepository.findOne(filterDto.receiver_id);
        return this.messageRepository.getMessages(sender, receiver);
    }

    // async getMessageById(id: number): Promise<Message> {
    //     const found = await this.messageRepository.findOne(id);
    //     if(!found) {
    //         throw new NotFoundException(`Feedback with ID '${id}' not found`);
    //     }

    //     return found;
    // }

    // async deleteMessage( id: number ): Promise<void> {

    //     const result = await this.messageRepository.delete(id);
    //     if(result.affected === 0) {
    //         throw new NotFoundException(`Feedback ID ${id} not found to delete`);
    //     }
    // }

    // async updateFeedback(
    //     id: number,
    //     couponDto: UpdateFeedbackDto
    // ): Promise<Message> {
    //     const feedback = await this.getFeedbackById(id);
    //     const { subject, comments, rating, status, feedback_type } = couponDto;

    //     feedback.subject = subject
    //     feedback.comments = comments
    //     feedback.rating = rating
    //     feedback.status = status
    //     feedback.feedback_type = feedback_type

    //     await feedback.save()
    //     return feedback;
    // }

}
