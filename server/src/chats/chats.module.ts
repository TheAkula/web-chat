import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGroupsModule } from 'src/chats-groups/chats-groups.module';
import { UsersModule } from 'src/users/users.module';
import { Chat } from './chat.entity';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), ChatsGroupsModule, UsersModule],
  providers: [ChatsResolver, ChatsService],
})
export class ChatsModule {}
