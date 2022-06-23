import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { v4 as uuid } from 'uuid';

@Injectable()
export class DbService {
  constructor(@InjectModel(User) private readonly userModel: typeof User) {}

  async findAll(): Promise<User[]> {
    return this.userModel.findAll();
  }

  async createUser() {
    return this.userModel.create({
      id: uuid(),
      firstName: 'firstname',
      lastName: 'lastname',
      chats: [],
    });
  }
}
