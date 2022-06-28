import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Chat } from './chat.entity';

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

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  salt: string;
}
