import { Message } from '../messages/message.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  Column,
  ManyToMany,
  JoinTable,
  ManyToOne,
} from 'typeorm';
import { User } from 'src/users/user.entity';
import { ChatsGroup } from 'src/chats-groups/chats-group.entity';

@Entity()
export class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @OneToMany(() => Message, (message) => message.chat)
  messages: Message[];

  @ManyToMany(() => User, (user) => user.chats)
  @JoinTable()
  users: User[];

  @ManyToOne(() => ChatsGroup)
  chatsGroup: ChatsGroup;
}
