import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/chats/chat.entity';
import { Chat as ChatModel } from './chat.model';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChatArgs } from './dto/create-chat.args';
import { UserLink } from 'src/users/user-link.model';
import { MessageLink } from 'src/messages/message-link.model';

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
  ) {}

  async createChat({ userId, name }: CreateChatArgs): Promise<ChatModel> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException(
        `User with id "${userId} does not exist"`,
      );
    }
    const chat = this.chatsRepository.create({
      name,
    });
    return this.chatsRepository.save(chat);
  }

  async getChatWithRelation(id: string, relation: string): Promise<ChatModel> {
    return await this.chatsRepository.findOne({
      where: { id },
      relations: [relation],
    });
  }

  async getUsers(id: string): Promise<UserLink[]> {
    const chat = await this.getChatWithRelation(id, 'users');
    if (!chat) {
      throw new NotFoundException(`Chat with id "${id}" not found`);
    }
    return chat.users;
  }

  async getMessages(id: string): Promise<MessageLink[]> {
    const chat = await this.getChatWithRelation(id, 'messages');
    if (!chat) {
      throw new NotFoundException(`Chat with id "${id}" not found`);
    }
    return chat.messages;
  }
}
