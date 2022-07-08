import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/chat.model';
import { User } from 'src/users/user.model';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class Message {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @ManyToOne(() => User)
  @Field(() => User)
  author: User;

  @Column()
  @Field()
  content: string;

  @ManyToOne(() => Chat, (chat) => chat.messages)
  @Field(() => Chat)
  chat: Chat;

  @CreateDateColumn()
  @Field()
  createdAt: Date;

  @UpdateDateColumn()
  @Field()
  updatedAt: Date;
}
