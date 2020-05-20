import { BaseRepository } from 'typeorm-transactional-cls-hooked/dist';
import { TaskEntity } from './../entity/task.entity';
import { EntityRepository, Connection } from 'typeorm';

@EntityRepository(TaskEntity)
export class TaskRepository extends BaseRepository<TaskEntity>{

    async findById(id: string): Promise<TaskEntity> {
        return this.findOneOrFail({ id });
    }

    async getTaskActiveByUserId(user: string){
        return this.createQueryBuilder('task')
        .where('task.deleted = 0')
        .andWhere('task.finished = 0')
        .andWhere('task.userResponsible = :userId', {userId: user})
        .getManyAndCount();
    }

    async getTaskfinishedByUserId(user: string){
        return this.createQueryBuilder('task')
        .where('task.deleted = 0')
        .andWhere('task.finished = 1')
        .andWhere('task.userResponsible = :userId', {userId: user})
        .getManyAndCount();
    }

    async getTaskDeletedByUserId(user: string){
        return this.createQueryBuilder('task')
        .where('task.deleted = 1')
        .andWhere('task.userResponsible = :userId', {userId: user})
        .getManyAndCount();
    }

}

export const TaskRepositoryProvider = {
    provide: 'TaskRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(TaskRepository),
    inject: [Connection],
}