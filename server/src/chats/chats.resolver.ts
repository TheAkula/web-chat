import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatsGroupLink } from 'src/chats-groups/chat-group-link.model';
import { ChatsGroupsService } from 'src/chats-groups/chats-groups.service';
import { MessageLink } from 'src/messages/message-link.model';
import { Message } from 'src/messages/message.model';
import { UserLink } from 'src/users/user-link.model';
import { Chat } from './chat.model';
import { ChatsService } from './chats.service';
import { CreateChatArgs } from './dto/create-chat.args';

@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private chatsService: ChatsService,
    private chatsGroupsService: ChatsGroupsService,
  ) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  createChat(@Args() args: CreateChatArgs): Promise<Chat> {
    return this.chatsService.createChat(args);
  }

  @ResolveField('users', () => [UserLink])
  getUsers(@Parent() parent: Chat): Promise<UserLink[]> {
    return this.chatsService.getUsers(parent.id);
  }

  @ResolveField('chatsGroup', () => ChatsGroupLink)
  getChatsGroup(@Parent() parent: Chat): Promise<ChatsGroupLink> {
    return this.chatsGroupsService.getChatsGroup(parent.chatsGroup.id);
  }

  @ResolveField('messages', () => [MessageLink])
  getMessages(@Parent() parent: Chat): Promise<MessageLink[]> {
    return this.chatsService.getMessages(parent.id);
  }
}
