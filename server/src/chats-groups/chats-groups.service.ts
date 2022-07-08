import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ChatLink } from 'src/chats/chat-link.model';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { Repository } from 'typeorm';
import { ChatsGroup } from './chats-group.model';
import { ChatsGroup as ChatsGroupModel } from './chats-group.model';
import { CreateChatsGroupDto } from './dto/create-chats-group.dto';

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

  async createChatsGroup({
    name,
    user,
    imgUrl,
  }: CreateChatsGroupDto): Promise<ChatsGroup> {
    const newChatsGroup = this.chatsGroupsRepository.create({
      imgUrl,
      name,
      users: [user],
    });
    await this.chatsGroupsRepository.save(newChatsGroup);
    return newChatsGroup;
  }

  async getMyChatsGroups(user: User): Promise<ChatsGroup[]> {
    return this.chatsGroupsRepository
      .createQueryBuilder('chatsGroup')
      .innerJoin('chatsGroup.users', 'user', 'user.id = :userId', {
        userId: user.id,
      })
      .getMany();
  }
}
