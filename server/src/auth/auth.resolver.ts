import { UseGuards } from '@nestjs/common';
import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { User } from 'src/users/user.model';
import { Auth } from './auth.model';
import { AuthService } from './auth.service';
import { SignInArgs as SignInArgsType } from './dto/signin.args';
import { SignUpArgs } from './dto/signup.args';
import { LocalAuthGuard } from './local-auth.guard';
import { SignInArgs } from './signin-args.decorator';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  @Mutation(() => User)
  async signUp(@Args() args: SignUpArgs): Promise<User> {
    return await this.authService.signUp(args);
  }

  @UseGuards(LocalAuthGuard)
  @Mutation(() => Auth)
  async login(@Args() @SignInArgs() args: SignInArgsType) {
    return this.authService.signIn(args);
  }
}
