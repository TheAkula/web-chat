import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/models/chat.entity';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { CreateChatArgs } from './dto/create-chat.args';

@Injectable()
export class ChatsService {
  constructor(
    private usersService: UsersService,
    @InjectRepository(Chat) private chatModel: Repository<Chat>,
  ) {}

  async createChat({ userId, name }: CreateChatArgs): Promise<Chat> {
    const user = await this.usersService.findUserById(userId);
    if (!user) {
      throw new UnauthorizedException(
        `User with id "${userId} does not exist"`,
      );
    }
    const chat = this.chatModel.create({
      name,
    });
    return this.chatModel.save(chat);
  }
}
