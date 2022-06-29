import { ChatsGroup } from 'src/chats-groups/chats-group.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Chat } from '../chats/chat.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: false })
  isActive: boolean;

  @ManyToMany(() => Chat, (chat) => chat.users)
  chats: Chat[];

  @ManyToMany(() => ChatsGroup, (chatGroup) => chatGroup.users)
  chatsGroups: ChatsGroup[];

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
