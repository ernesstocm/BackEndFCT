import { BaseRepository } from 'typeorm-transactional-cls-hooked/dist';
import { TaskEntity } from './../entity/task.entity';
import { EntityRepository, Connection } from 'typeorm';

@EntityRepository(TaskEntity)
export class TaskRepository extends BaseRepository<TaskEntity>{

    async findById(id: string): Promise<TaskEntity> {
        return this.findOneOrFail({ id });
    }
}

export const TaskRepositoryProvider = {
    provide: 'TaskRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(TaskRepository),
    inject: [Connection],
}