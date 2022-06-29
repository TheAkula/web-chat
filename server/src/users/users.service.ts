import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from 'src/users/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Chat } from 'src/chats/chat.model';
import { ChatLink } from 'src/chats/chat-link.model';
import { ChatsGroupLink } from 'src/chats-groups/chat-group-link.model';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUserById(id: string): Promise<User> {
    return await this.userRepository.findOneBy({ id });
  }

  async findUserWithRelation(id: string, relation: string): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [relation],
    });
  }

  async findUserByEmail(email: string): Promise<User> {
    return await this.userRepository.findOneBy({ email });
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = this.userRepository.create({ ...createUserDto });
    return await this.userRepository.save(newUser);
  }

  async getChats(id: string): Promise<ChatLink[]> {
    const user = await this.findUserWithRelation(id, 'chats');
    if (!user) {
      throw new NotFoundException(`User with id "${id} not found"`);
    }
    return user.chats;
  }

  async getChatsGroups(id: string): Promise<ChatsGroupLink[]> {
    const user = await this.findUserWithRelation(id, 'chatsGroups');
    if (!user) {
      throw new NotFoundException(`User with id "${id} not found"`);
    }
    return user.chatsGroups;
  }
}
