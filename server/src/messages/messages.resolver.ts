import { UseGuards } from '@nestjs/common';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { ChatLink } from 'src/chats/chat-link.model';
import { PubSubProvider } from 'src/pub-sub';
import { UserLink } from 'src/users/user-link.model';
import { User } from 'src/users/user.model';
import { CreateMessageArgs } from './dto/create-message.args';
import { Message } from './message.model';
import { MessagesService } from './messages.service';

@Resolver(() => Message)
export class MessagesResolver {
  constructor(
    private messagesService: MessagesService,
    private pubSub: PubSubProvider,
  ) {}

  @Query(() => [Message], { name: 'messages' })
  getMessages(@Args('id') id: string): Promise<Message[]> {
    return this.messagesService.getMessages(id);
  }

  @Subscription(() => Message, {
    nullable: true,
  })
  messageCreated() {
    return this.pubSub.asyncIterator('MESSAGE_CREATED');
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Message)
  async createMessage(
    @Args() args: CreateMessageArgs,
    @CurrentUser() author: User,
  ): Promise<Message> {
    const newMessage = await this.messagesService.createMessage({
      ...args,
      author,
    });
    console.log('message created');
    this.pubSub.publish('MESSAGE_CREATED', {
      messageCreated: newMessage,
    });
    return newMessage;
  }

  @ResolveField('chat', () => ChatLink)
  getChat(@Parent() parent: Message): Promise<ChatLink> {
    return this.messagesService.getChat(parent.id);
  }

  @ResolveField('author', () => UserLink)
  getAuthor(@Parent() parent: Message): Promise<UserLink> {
    return this.messagesService.getAuthor(parent.id);
  }
}
