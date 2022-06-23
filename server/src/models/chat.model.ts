import {
  AllowNull,
  Column,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Message } from './message.model';
import { User } from './user.model';

@Table
export class Chat extends Model {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  id: string;

  @ForeignKey(() => User)
  users: User[];

  @HasMany(() => Message, 'id')
  messages: Message[];
}
