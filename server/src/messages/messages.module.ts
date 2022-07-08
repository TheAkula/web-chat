import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Message } from './message.model';
import { MessagesService } from './messages.service';
import { MessagesResolver } from './messages.resolver';
import { ChatsModule } from 'src/chats/chats.module';
import { PubSubProvider } from 'src/pub-sub';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Message]),
    ChatsModule,
    ChatsModule,
    UsersModule,
  ],
  providers: [MessagesService, MessagesResolver, PubSubProvider],
})
export class MessagesModule {}
