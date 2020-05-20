import { TaskEntity } from './../../database/entity/task.entity';
export class GetTaskFinishedsByUserResponse{
    task: TaskEntity[];
    count: number;
}