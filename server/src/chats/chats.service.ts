import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Chat } from 'src/chats/chat.model';
import { Chat as ChatModel } from './chat.model';
import { Repository } from 'typeorm';
import { UserLink } from 'src/users/user-link.model';
import { MessageLink } from 'src/messages/message-link.model';
import { ChatsGroupsService } from 'src/chats-groups/chats-groups.service';
import { CreateChatDto } from './dto/create-chat.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class ChatsService {
  constructor(
    @InjectRepository(Chat) private chatsRepository: Repository<Chat>,
    private chatsGroupsService: ChatsGroupsService,
    private usersSerive: UsersService,
  ) {}

  async createChat({ name, user, chatsGroupId }: CreateChatDto): Promise<Chat> {
    const chatsGroup = await this.chatsGroupsService.getChatsGroup(
      chatsGroupId,
    );
    if (!chatsGroup) {
      throw new NotFoundException(
        `Chats group with id "${chatsGroupId}" not found`,
      );
    }
    const chat = this.chatsRepository.create({
      name,
      users: [user],
      chatsGroup: chatsGroup,
    });
    return await this.chatsRepository.save(chat);
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

  async getChat(id: string): Promise<ChatModel> {
    return this.chatsRepository.findOneBy({ id });
  }

  async getChats(id: string): Promise<ChatModel[]> {
    return await this.chatsRepository.find({
      where: { chatsGroup: { id } },
      relations: ['chatsGroup'],
    });
  }
}
