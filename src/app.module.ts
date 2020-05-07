import { TaskModule } from './task/task.module';
import { UserModule } from './user/user.modules';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Connection } from 'typeorm';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as ORMConfig from './ormconfig';
import { TaskEntity } from './database/entity/task.entity';

@Module({
  imports: [
    UserModule,
    TaskEntity,
    TaskModule,
    GraphQLModule.forRoot({
      typePaths: ['./**/*.graphql'],
      context: ({ req, res }) => ({
        request: req,
      }),
    }),
    TypeOrmModule.forRoot(ORMConfig),

  ],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule { }
