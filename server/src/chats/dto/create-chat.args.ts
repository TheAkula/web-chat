import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChatArgs {
  @Field()
  name: string;

  @Field()
  chatsGroupId: string;
}
