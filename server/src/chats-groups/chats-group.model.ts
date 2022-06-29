import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/chat.model';
import { User } from 'src/users/user.model';

@ObjectType()
export class ChatsGroup {
  @Field()
  id: string;

  @Field(() => [Chat], { nullable: true })
  chats: Chat[];

  @Field()
  name: string;

  @Field({ nullable: true })
  imgUrl: string;

  @Field(() => [User])
  users: User[];
}
