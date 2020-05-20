import { TaskEntity } from './../../database/entity/task.entity';
export class GetTaskActivesByUserResponse {
    task: TaskEntity[];
    count: number;
}