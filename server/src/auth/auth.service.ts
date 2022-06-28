import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from './dto/signup.dto';
import { UsersService } from 'src/users/users.service';
import { AuthenticationError } from 'apollo-server-express';
import { pbkdf2Sync, randomBytes } from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { SignInDto } from './dto/signin.dto';
import { User } from 'src/users/user.model';
import { ValidateByEmailDto } from './dto/validateByEmail.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { firstName, lastName, password, email } = signUpDto;
    const user = await this.userService.findUserByEmail(email);
    if (user) {
      throw new AuthenticationError(
        `User with email "${email}" already exists"`,
      );
    }

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex');
    const newUser = await this.userService.createUser({
      salt,
      password: hash,
      firstName,
      lastName,
      email,
    });
    {
      const { password, salt, ...user } = newUser;
      return {
        ...user,
        userToken: this.jwtService.sign({ id: newUser.id, email }),
      };
    }
  }

  async signIn(signInDto: SignInDto) {
    const user = await this.validateByEmail(signInDto);
    const payload = {
      id: user.id,
      email: user.email,
    };
    return {
      userToken: this.jwtService.sign(payload),
    };
  }

  async validateByEmail({ email, password }: ValidateByEmailDto) {
    const user = await this.userService.findUserByEmail(email);
    if (!user) {
      throw new UnauthorizedException(
        `User with email ${email} does not exist`,
      );
    }
    const hash = pbkdf2Sync(password, user.salt, 1000, 64, 'sha512').toString(
      'hex',
    );
    if (user.password !== hash) {
      throw new UnauthorizedException(`Password is wrong`);
    }
    return user;
  }
}
