import { Message } from '../messages/message.model';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/user.model';
import { ChatsGroup } from 'src/chats-groups/chats-group.model';
import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => Message, (message) => message.chat)
  @Field(() => [Message])
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  @Field(() => [User])
  users: User[];

  @ManyToOne(() => ChatsGroup)
  @Field(() => ChatsGroup)
  chatsGroup: ChatsGroup;
}
