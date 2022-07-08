import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGroupsModule } from 'src/chats-groups/chats-groups.module';
import { PubSubProvider } from 'src/pub-sub';
import { UsersModule } from 'src/users/users.module';
import { Chat } from './chat.model';
import { ChatsResolver } from './chats.resolver';
import { ChatsService } from './chats.service';

@Module({
  imports: [TypeOrmModule.forFeature([Chat]), UsersModule, ChatsGroupsModule],
  providers: [ChatsResolver, ChatsService, PubSubProvider],
  exports: [ChatsService],
})
export class ChatsModule {}
