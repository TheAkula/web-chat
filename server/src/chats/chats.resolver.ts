import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { Chat } from './chat.model';
import { ChatsService } from './chats.service';
import { CreateChatArgs } from './dto/create-chat.args';

@Resolver()
export class ChatsResolver {
  constructor(private chatsService: ChatsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Chat)
  createChat(@Args() args: CreateChatArgs): Promise<Chat> {
    return this.chatsService.createChat(args);
  }
}
