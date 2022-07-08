import { Field, ObjectType } from '@nestjs/graphql';
import { ChatsGroup } from 'src/chats-groups/chats-group.model';
import { Chat } from 'src/chats/chat.model';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @Column()
  @Field()
  firstName: string;

  @Column()
  @Field()
  lastName: string;

  @Column({ default: false })
  @Field()
  isActive: boolean;

  @ManyToMany(() => Chat, (chat) => chat.users)
  @Field(() => [Chat])
  chats: Chat[];

  @Column()
  @Field()
  email: string;

  @Field({ nullable: true })
  userToken?: string;

  @ManyToMany(() => ChatsGroup, (chatGroup) => chatGroup.users)
  @JoinTable()
  @Field(() => [ChatsGroup])
  chatsGroups: ChatsGroup[];

  @Column()
  password: string;

  @Column()
  salt: string;
}
