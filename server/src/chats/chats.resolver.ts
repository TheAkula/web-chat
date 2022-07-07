import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Query,
  Subscription,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { MessageLink } from 'src/messages/message-link.model';
import { PubSubProvider } from 'src/pub-sub';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { Chat } from './chat.model';
import { ChatsService } from './chats.service';
import { CreateChatArgs } from './dto/create-chat.args';

@UseGuards(GqlAuthGuard)
@Resolver(() => Chat)
export class ChatsResolver {
  constructor(
    private chatsService: ChatsService,
    private pubSub: PubSubProvider,
  ) {}

  @Query(() => [Chat], { name: 'chats' })
  getChats(@Args('id') id: string): Promise<Chat[]> {
    return this.chatsService.getChats(id);
  }

  @Mutation(() => Chat)
  async createChat(
    @Args() args: CreateChatArgs,
    @CurrentUser() user: User,
  ): Promise<Chat> {
    const newChat = await this.chatsService.createChat({ ...args, user });
    this.pubSub.publish('CHAT_CREATED', { chatCreated: newChat });
    return newChat;
  }

  @Subscription(() => Chat)
  chatCreated() {
    return this.pubSub.asyncIterator('CHAT_CREATED');
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
