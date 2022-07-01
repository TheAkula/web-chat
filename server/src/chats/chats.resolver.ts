import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatsGroupsService } from 'src/chats-groups/chats-groups.service';
import { MessageLink } from 'src/messages/message-link.model';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { Chat } from './chat.model';
import { ChatsService } from './chats.service';
import { CreateChatArgs } from './dto/create-chat.args';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private chatsService: ChatsService,
    private chatsGroupsService: ChatsGroupsService,
  ) {}

  @Query(() => [Chat], { name: 'chats' })
  getChats(@Args('id') id: string): Promise<Chat[]> {
    return this.chatsService.getChats(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  createChat(
    @Args() args: CreateChatArgs,
    @CurrentUser() user: User,
  ): Promise<Chat> {
    return this.chatsService.createChat({ ...args, user });
  }

  @ResolveField('users', () => [UserLink])
  getUsers(@Parent() parent: Chat): Promise<UserLink[]> {
    return this.chatsService.getUsers(parent.id);
  }

  @ResolveField('messages', () => [MessageLink])
  getMessages(@Parent() parent: Chat): Promise<MessageLink[]> {
    return this.chatsService.getMessages(parent.id);
  }
}
