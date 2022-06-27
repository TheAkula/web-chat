import { Query } from '@nestjs/graphql';
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SignUpArgs } from './dto/signup.args';
import { User } from './user.model';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private usersService: UsersService) {}

  @Mutation(() => User)
  async signUp(@Args() args: SignUpArgs): Promise<User> {
    return await this.usersService.signUp(args);
  }

  @Query(() => User, { name: 'user' })
  async getUserById(@Args('id') id: string): Promise<User> {
    return await this.usersService.getUserById(id);
  }
}
