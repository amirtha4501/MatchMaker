import { Controller, Post, Get, Body, ValidationPipe, Query } from '@nestjs/common';
import { MessageService } from '../service/message.service';
import { MessageDto } from '../dto/message.dto';
import { Message } from '../model/message.entity';
import { GetMessagesFilterDto } from '../dto/get-messages-filter.dto';


@Controller('message')
export class MessageController {

    constructor(
        private messageService: MessageService
    ) {}

    @Post()
    createMessage(
        @Body(ValidationPipe) feedbackDto: MessageDto
    ): Promise<void> {
        return this.messageService.createMessage(feedbackDto);
    }

    @Get()
    getMessages(@Query(ValidationPipe) filterDto: GetMessagesFilterDto): Promise<Message[]> {
        return this.messageService.getMessages(filterDto);
    }

    // @Get('/:id')
    // getMessageById(@Param('id', ParseIntPipe) id: number ): Promise<Message> {
    //     return this.messageService.getMessageById(id)
    // }

    // @Delete('/:id')
    // deleteMessage(@Param('id', ParseIntPipe) id: number): Promise<void> {
    //     return this.messageService.deleteMessage(id);
    // }

    // @Patch('/:id')
    // updateFeedbackStatus(
    //     @Param('id', ParseIntPipe) id: number,
    //     @Body(ValidationPipe) feedbackDto: UpdateFeedbackDto
    // ): Promise<Feedback> {
    //     return this.feedbackService.updateFeedback(id, feedbackDto);
    // }

}
