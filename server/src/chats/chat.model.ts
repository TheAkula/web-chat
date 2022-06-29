import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsGroup } from 'src/chats-groups/chats-group.model';
import { Message } from 'src/messages/message.model';
import { User } from 'src/users/user.model';

@ObjectType()
export class Chat {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field(() => [User])
  users: User[];

  @Field(() => [Message])
  messages: Message[];

  @Field(() => ChatsGroup)
  chatsGroup: ChatsGroup;
}
