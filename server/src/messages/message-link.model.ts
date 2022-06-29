import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class MessageLink {
  @Field()
  id: string;

  @Field({ defaultValue: false })
  isRead: boolean;

  @Field(() => String)
  content: string;

  @Field()
  date: Date;
}
