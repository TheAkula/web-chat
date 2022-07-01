import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageLink {
  @Field()
  id: string;

  @Field(() => String)
  content: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
