import { UseGuards } from '@nestjs/common';
import { Parent, Query, ResolveField } from '@nestjs/graphql';
import { Args, Resolver } from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatsGroupLink } from 'src/chats-groups/chat-group-link.model';
import { ChatLink } from 'src/chats/chat-link.model';
import { User } from './user.model';
import { UsersService } from './users.service';

@UseGuards(GqlAuthGuard)
@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.usersService.findUserById(id);
  }

  @Query(() => User)
  myUserInfo(@CurrentUser() user: User): User {
    return user;
  }

  @ResolveField('chats', () => [ChatLink])
  getChats(@Parent() parent: User): Promise<ChatLink[]> {
    return this.usersService.getChats(parent.id);
  }

  @ResolveField('chatsGroups', () => [ChatsGroupLink])
  getChatsGroups(@Parent() parent: User): Promise<ChatsGroupLink[]> {
    return this.usersService.getChatsGroups(parent.id);
  }
}
