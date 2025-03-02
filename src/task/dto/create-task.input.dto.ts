import { StateTaskEnum } from './../../database/enum/state-task.enum';
export class CreateTaskInputDto{
    startDate: Date;
    endDate:Date;
    name: string;
    description: string;
    state: StateTaskEnum;
    userResponsibleId: string;
}