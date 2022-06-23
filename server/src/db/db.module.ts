import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/models/user.model';
import { DbController } from './db.controller';
import { DbService } from './db.service';

@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [DbController],
  providers: [DbService],
  exports: [DbService],
})
export class DbModule {}
