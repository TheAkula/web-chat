import { ArgsType, Field } from '@nestjs/graphql';

@ArgsType()
export class CreateChatsGroupArgs {
  @Field()
  name: string;

  @Field({ nullable: true })
  imgUrl?: string;

  @Field()
  userId: string;
}
