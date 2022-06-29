import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
} from '@nestjs/graphql';
import { ChatLink } from 'src/chats/chat-link.model';
import { Chat } from 'src/chats/chat.model';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { ChatsGroup } from './chats-group.model';
import { ChatsGroupsService } from './chats-groups.service';
import { CreateChatsGroupArgs } from './dto/create-chats-group.dto';

@Resolver(() => ChatsGroup)
export class ChatsGroupsResolver {
  constructor(private chatsGroupsService: ChatsGroupsService) {}

  @Query(() => ChatsGroup, { name: 'chatsGroups' })
  getChatsGroup(@Args('id') id: string): Promise<ChatsGroup> {
    return this.chatsGroupsService.getChatsGroup(id);
  }

  @Mutation(() => ChatsGroup)
  createChatsGroup(@Args() createChatsGroupDto: CreateChatsGroupArgs) {
    return this.chatsGroupsService.createChatsGroup(createChatsGroupDto);
  }

  @ResolveField('chats', () => [ChatLink])
  getChats(@Parent() parent: ChatsGroup): Promise<ChatLink[]> {
    return this.chatsGroupsService.getChats(parent.id);
  }

  @ResolveField('users', () => [UserLink])
  getUsers(@Parent() parent: ChatsGroup): Promise<UserLink[]> {
    return this.chatsGroupsService.getUsers(parent.id);
  }
}
