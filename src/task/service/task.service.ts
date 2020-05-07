import { StateTaskEnum } from './../../database/enum/state-task.enum';
import { CreateTaskResponseDto } from './../dto/create-task.response.dto';
import { TaskEntity } from './../../database/entity/task.entity';
import { UserRepository } from './../../database/repositories/user.entity.repository';
import { TaskRepository } from './../../database/repositories/task.entity.repository';
import { Injectable } from "@nestjs/common";
import { CreateTaskInputDto } from '../dto/create-task.input.dto';

@Injectable()
export class TaskService{
    constructor(
        readonly taskRepository: TaskRepository,
        readonly userRepository: UserRepository,
    ){}

    async createTask(createTaskInput: CreateTaskInputDto){
        console.log(createTaskInput)
        const user = await this.userRepository.findById(createTaskInput.userResponsibleId);
        const newTask = new TaskEntity();
        newTask.name = createTaskInput.name;
        newTask.Description = createTaskInput.descrption;
        newTask.startDate = createTaskInput.startDate;
        newTask.endDate = createTaskInput.endDate;
        newTask.state = createTaskInput.state;
        newTask.createdAt = new Date();
        newTask.updatedAt = new Date();
        newTask.userResponsible = user;
        console.log(newTask)
        await this.taskRepository.save(newTask)
        
        const createTaskResponse = new CreateTaskResponseDto();
        createTaskResponse.result = true;

        return createTaskResponse;
    }
}