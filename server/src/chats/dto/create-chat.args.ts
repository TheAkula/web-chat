import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChatArgs {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  chatsGroupId: string;
}
