import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/chat.model';
import { User } from 'src/users/user.model';

@ObjectType()
export class Message {
  @Field()
  id: string;

  @Field(() => User)
  author: User;

  @Field()
  content: string;

  @Field(() => Chat)
  chat: Chat;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
