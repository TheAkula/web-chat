import { Chat } from 'src/chats/chat.entity';
import { User } from 'src/users/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class ChatsGroup {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @OneToMany(() => Chat, (chat) => chat.chatsGroup, { nullable: true })
  chats: Chat[];

  @Column()
  name: string;

  @Column({ nullable: true })
  imgUrl: string;

  @ManyToMany(() => User, (user) => user.chatsGroups)
  users: User[];
}
