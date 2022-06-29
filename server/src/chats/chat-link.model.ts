import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class ChatLink {
  @Field()
  id: string;

  @Field()
  name: string;
}
