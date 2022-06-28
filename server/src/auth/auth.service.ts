import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { User as UserModel } from 'src/models/user.entity';
import { UsersService } from 'src/users/users.service';
import { AuthenticationError } from 'apollo-server-express';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<UserModel> {
    const { firstName, lastName, password, email } = signUpDto;
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new AuthenticationError(
        `User with email "${email}" already exists"`,
      );
    }

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex');
    return this.userService.createUser({
      salt,
      password: hash,
      firstName,
      lastName,
      email,
    });
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateByEmail(signInDto);
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateByEmail({ email, password }: SignInDto) {
    const user = await this.userService.findUserByEmail(email);
    const hash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString(
      'hex',
    );
    if (user.password !== hash) {
      throw new UnauthorizedException(`Password is wrong`);
    }
    return user;
  }
}
