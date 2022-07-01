import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.entity';
import { Message as MessageModel } from './message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private chatsService: ChatsService,
  ) {}

  async getMessages(id: string): Promise<MessageModel[]> {
    return this.messagesRepository.find({ where: { chat: { id } } });
  }

  async createMessage({
    content,
    chatId,
    author,
  }: CreateMessageDto): Promise<MessageModel> {
    const chat = await this.chatsService.getChat(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat with id "${chatId}" not found`);
    }
    const message = this.messagesRepository.create({
      content,
      chat: chat,
      author: author,
    });

    return this.messagesRepository.save(message);
  }

  async getChat(id: string) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['chat'],
    });
    return message.chat;
  }

  async getAuthor(id: string) {
    const message = await this.messagesRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    return message.author;
  }
}
