import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { SequelizeModule } from '@nestjs/sequelize';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { DbModule } from './db/db.module';
import { Chat } from './models/chat.model';
import { Message } from './models/message.model';
import { User } from './models/user.model';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PSQL_HOST || 'db',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'chat',
      synchronize: true,
      models: [Chat, Message, User],
      autoLoadModels: true,
    }),
    DbModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      subscriptions: {
        'graphql-ws': true,
      },
    }),
  ],
})
export class AppModule {}
