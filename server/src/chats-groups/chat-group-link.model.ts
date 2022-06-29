import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatsGroupLink {
  @Field()
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  imgUrl: string;
}
