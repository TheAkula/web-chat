import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { UsersModule } from './users/users.module';
import { ChatsModule } from './chats/chats.module';
import { MessagesModule } from './messages/messages.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { ChatsGroupsModule } from './chats-groups/chats-groups.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PSQL_HOST || 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'chat',
      autoLoadEntities: true,
      synchronize: true,
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      plugins: [ApolloServerPluginLandingPageLocalDefault()],
      playground: false,
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    }),
    UsersModule,
    ChatsModule,
    MessagesModule,
    AuthModule,
    ChatsGroupsModule,
  ],
})
export class AppModule {}
