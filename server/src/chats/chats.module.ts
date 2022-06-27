import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Chat } from '../models/chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Chat])],
})
export class ChatsModule {}
