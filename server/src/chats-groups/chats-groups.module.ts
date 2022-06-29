import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatsGroup } from './chats-group.entity';
import { ChatsGroupsResolver } from './chats-groups.resolver';
import { ChatsGroupsService } from './chats-groups.service';

@Module({
  imports: [TypeOrmModule.forFeature([ChatsGroup])],
  providers: [ChatsGroupsResolver, ChatsGroupsService],
  exports: [ChatsGroupsService],
})
export class ChatsGroupsModule {}
