import { UseGuards } from '@nestjs/common';
import {
  Resolver,
  Query,
  Args,
  ResolveField,
  Parent,
  Mutation,
  Subscription,
} from '@nestjs/graphql';
import { ChatLink } from 'src/chats/chat-link.model';
import { UserLink } from 'src/users/user-link.model';
import { ChatsGroup } from './chats-group.model';
import { ChatsGroupsService } from './chats-groups.service';
import { CreateChatsGroupArgs } from './dto/create-chats-group.args';
import { PubSubProvider } from 'src/pub-sub';
import { GqlAuthGuard } from 'src/auth/jwt-auth.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { CurrentUser as CurrentUserModel } from 'src/auth/current-user.model';

@Resolver(() => ChatsGroup)
export class ChatsGroupsResolver {
  constructor(
    private chatsGroupsService: ChatsGroupsService,
    private pubSub: PubSubProvider,
  ) {}

  @Query(() => ChatsGroup, { name: 'chatsGroups' })
  getChatsGroup(@Args('id') id: string): Promise<ChatsGroup> {
    return this.chatsGroupsService.getChatsGroup(id);
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(() => ChatsGroup)
  async createChatsGroup(
    @Args() createChatsGroupArgs: CreateChatsGroupArgs,
    @CurrentUser() { userId }: CurrentUserModel,
  ) {
    const newChat = await this.chatsGroupsService.createChatsGroup({
      ...createChatsGroupArgs,
      userId,
    });
    this.pubSub.publish('CHATS_GROUP_CREATED', { chatsGroupdCreated: newChat });
    return newChat;
  }

  @Subscription(() => ChatsGroup, { name: 'chatsGroupCreated' })
  chatsGroupAdded() {
    return this.pubSub.asyncIterator('CHATS_GROUP_CREATED');
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
