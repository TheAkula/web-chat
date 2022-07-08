import { Field, ObjectType } from '@nestjs/graphql';
import { Chat } from 'src/chats/chat.model';
import { User } from 'src/users/user.model';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@ObjectType()
@Entity()
export class ChatsGroup {
  @PrimaryGeneratedColumn('uuid')
  @Field()
  id: string;

  @OneToMany(() => Chat, (chat) => chat.chatsGroup, { nullable: true })
  @Field(() => [Chat], { nullable: true })
  chats: Chat[];

  @Column()
  @Field()
  name: string;

  @Column({ nullable: true })
  @Field({ nullable: true })
  imgUrl: string;

  @ManyToMany(() => User, (user) => user.chatsGroups)
  @Field(() => [User])
  users: User[];
}
