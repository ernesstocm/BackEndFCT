import { TaskEntity } from './../../database/entity/task.entity';
export class GetTaskDeletedsByUserResponse{
    task: TaskEntity[];
    count: number;
}