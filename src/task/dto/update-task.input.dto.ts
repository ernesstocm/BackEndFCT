import { StateTaskEnum } from './../../database/enum/state-task.enum';
export class UpdateTaskInputDto{
    id: string;
    name: string;
    description: string;
    startDate: Date;
    endDate:Date;
    state: StateTaskEnum;
    userResponsibleId: string;
}