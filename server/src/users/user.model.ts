import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsGroup } from 'src/chats-groups/chats-group.model';
import { Chat } from 'src/chats/chat.model';

@ObjectType()
export class User {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;

  @Field(() => [Chat])
  chats: Chat[];

  @Field()
  email: string;

  @Field()
  userToken?: string;

  @Field(() => [ChatsGroup])
  chatsGroups: ChatsGroup[];
}
