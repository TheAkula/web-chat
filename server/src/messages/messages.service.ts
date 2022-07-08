import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatsService } from 'src/chats/chats.service';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateMessageDto } from './dto/create-message.dto';
import { Message } from './message.model';
import { Message as MessageModel } from './message.model';

@Injectable()
export class MessagesService {
  constructor(
    @InjectRepository(Message) private messagesRepository: Repository<Message>,
    private chatsService: ChatsService,
    private usersService: UsersService,
  ) {}

  async getMessages(id: string): Promise<MessageModel[]> {
    return this.messagesRepository.find({ where: { chat: { id } } });
  }

  async createMessage({ content, chatId, author }: CreateMessageDto) {
    const chat = await this.chatsService.getChat(chatId);
    if (!chat) {
      throw new NotFoundException(`Chat with id "${chatId}" not found`);
    }
    const users = await this.usersService.getUsersForMessage(chat.id);
    const message = this.messagesRepository.create({
      content,
      chat: chat,
      author: author,
    });

    return { message: this.messagesRepository.save(message), users: users };
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
