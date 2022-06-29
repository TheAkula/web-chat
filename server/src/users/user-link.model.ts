import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserLink {
  @Field()
  id: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  isActive: boolean;

  @Field()
  email: string;

  @Field()
  userToken?: string;
}
