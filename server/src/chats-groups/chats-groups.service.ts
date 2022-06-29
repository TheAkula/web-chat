import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatLink } from 'src/chats/chat-link.model';
import { Chat } from 'src/chats/chat.model';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { Repository } from 'typeorm';
import { ChatsGroup } from './chats-group.entity';
import { ChatsGroup as ChatsGroupModel } from './chats-group.model';
import { CreateChatsGroupArgs } from './dto/create-chats-group.dto';

@Injectable()
export class ChatsGroupsService {
  constructor(
    @InjectRepository(ChatsGroup)
    private chatsGroupsRepository: Repository<ChatsGroup>,
  ) {}

  async getChatsGroup(id: string): Promise<ChatsGroupModel> {
    return await this.chatsGroupsRepository.findOneBy({ id });
  }

  async getUsers(id: string): Promise<UserLink[]> {
    const chatsGroup = await this.getChatsGroupWithRelation(id, 'users');
    if (!chatsGroup) {
      throw new NotFoundException(`Chats group with id "${id} not found"`);
    }
    return chatsGroup.users;
  }

  async getChatsGroupWithRelation(
    id: string,
    relation: string,
  ): Promise<ChatsGroupModel> {
    return this.chatsGroupsRepository.findOne({
      where: { id },
      relations: [relation],
    });
  }

  async getChats(id: string): Promise<ChatLink[]> {
    const chatsGroup = await this.getChatsGroupWithRelation(id, 'chats');
    if (!chatsGroup) {
      throw new NotFoundException(`Chats group with id "${id} not found"`);
    }
    return chatsGroup.chats;
  }

  async createChatsGroup(
    createChatsGroupDto: CreateChatsGroupArgs,
  ): Promise<ChatsGroupModel> {
    const newChatsGroup = this.chatsGroupsRepository.create({
      ...createChatsGroupDto,
    });
    return await this.chatsGroupsRepository.save(newChatsGroup);
  }
}
