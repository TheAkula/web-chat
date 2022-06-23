import {
  AllowNull,
  Column,
  Default,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { Chat } from './chat.model';

@Table
export class User extends Model {
  @PrimaryKey
  @Unique
  @AllowNull(false)
  @Column
  id: string;

  @AllowNull(false)
  @Column
  firstName: string;

  @AllowNull(false)
  @Column
  lastName: string;

  @Default(false)
  @AllowNull(false)
  @Column
  isActive: boolean;

  @HasMany(() => Chat, 'id')
  chats: Chat[];
}
