import { Field, ObjectType } from '@nestjs/graphql';
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
}
