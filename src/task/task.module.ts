import { UserRepositoryProvider } from 'src/database/repositories/user.entity.repository';
import { TaskRepositoryProvider } from './../database/repositories/task.entity.repository';
import { TaskResolver } from './resolver/task.resolver';
import { TaskService } from './service/task.service';
import { TaskEntity } from './../database/entity/task.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from "@nestjs/common";

@Module({
    imports:[
        TypeOrmModule.forFeature([
            TaskEntity,
        ])
    ],
    providers: [TaskService, TaskResolver, TaskRepositoryProvider, UserRepositoryProvider],
    exports: [TaskService]
})
export class TaskModule {}