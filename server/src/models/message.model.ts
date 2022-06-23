import {
  AllowNull,
  BelongsTo,
  Column,
  Default,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript';
import { User } from './user.model';

@Table
export class Message extends Model {
  @PrimaryKey
  @AllowNull(false)
  @Unique
  @Column
  id: string;

  @BelongsTo(() => User, 'id')
  author: User;

  @AllowNull(false)
  @Column
  content: string;

  @Default(false)
  @Column
  isRead: boolean;
}
