import { Injectable } from '@nestjs/common';
import { User } from 'src/models/user.entity';
import { User as UserModel } from './user.model';
import { SignUpDto } from './dto/signup.dto';
import { AuthenticationError } from 'apollo-server-express';
import { randomBytes, pbkdf2Sync } from 'crypto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}
  async signUp(signUpDto: SignUpDto): Promise<UserModel> {
    const { firstName, lastName, password, email } = signUpDto;
    const user = await this.userRepository.findOneBy({ email });
    if (user) {
      throw new AuthenticationError(
        `User with email "${email}" already exists"`,
      );
    }

    const salt = randomBytes(16).toString('hex');
    const hash = pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString('hex');
    return this.userRepository.create({
      salt,
      password: hash,
      firstName,
      lastName,
      chats: [],
    });
  }

  async getUserById(id: string): Promise<User> {
    return this.userRepository.findOneBy({ id });
  }
}
