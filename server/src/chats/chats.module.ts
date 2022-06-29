import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { Chat } from '../models/chat.entity';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule],
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
