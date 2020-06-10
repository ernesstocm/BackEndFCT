import { FinishTaskResponseDto } from './../dto/finish-task.response.dto';
import { FinishTaskInputDto } from './../dto/finish-task.input.dto';
import { DeleteTaskResponseDto } from './../dto/delete-task.response.dto';
import { DeleteTaskInputDto } from './../dto/delete-task.input.dto';
import { UpdateTaskResponseDto } from './../dto/update-task.response.dto';
import { UpdateTaskInputDto } from './../dto/update-task.input.dto';
import { GetTaskDeletedsByUserResponse } from './../dto/get-task-deleted.response.dto';
import { GetTaskFinishedsByUserResponse } from './../dto/get-task-finished.response.dto';
import { GetTaskFinishedInputDto } from './../dto/get-task-finished.input.dto';
import { GetTaskActivesByUserResponse } from './../dto/get-task-active-by-user.response.dto';
import { GetTaskActiveByUser } from './../dto/get-task-active-by-user.input.dto';
import { StateTaskEnum } from './../../database/enum/state-task.enum';
import { CreateTaskResponseDto } from './../dto/create-task.response.dto';
import { TaskEntity } from './../../database/entity/task.entity';
import { UserRepository } from './../../database/repositories/user.entity.repository';
import { TaskRepository } from './../../database/repositories/task.entity.repository';
import { Injectable } from "@nestjs/common";
import { CreateTaskInputDto } from '../dto/create-task.input.dto';
import { GetTaskDeletedInputDto } from '../dto/get-task-deleted.input.dto';

@Injectable()
export class TaskService{
    constructor(
        readonly taskRepository: TaskRepository,
        readonly userRepository: UserRepository,
    ){}

    async createTask(createTaskInput: CreateTaskInputDto){
        const user = await this.userRepository.findById(createTaskInput.userResponsibleId);
        const newTask = new TaskEntity();
        newTask.name = createTaskInput.name;
        newTask.description = createTaskInput.description;
        newTask.startDate = createTaskInput.startDate;
        newTask.endDate = createTaskInput.endDate;
        newTask.state = createTaskInput.state;
        newTask.createdAt = new Date();
        newTask.updatedAt = new Date();
        newTask.userResponsible = user;
        await this.taskRepository.save(newTask)
        
        const createTaskResponse = new CreateTaskResponseDto();
        createTaskResponse.result = true;

        return createTaskResponse;
    }

    async updateTask(updateTaskInput: UpdateTaskInputDto){
        const task = await this.taskRepository.findById(updateTaskInput.id);

        if(updateTaskInput && updateTaskInput.name){
            task.name = updateTaskInput.name;
        } 
        if(updateTaskInput && updateTaskInput.description){
            task.description = updateTaskInput.description;
        } 
        if(updateTaskInput && updateTaskInput.startDate){
            task.startDate = updateTaskInput.startDate;
        } 
        if(updateTaskInput && updateTaskInput.endDate){
            task.endDate = updateTaskInput.endDate;
        } 
        if(updateTaskInput && updateTaskInput.state){
            task.state = updateTaskInput.state;
        } 
        if(updateTaskInput && updateTaskInput.userResponsibleId){
            const user = await this.userRepository.findById(updateTaskInput.userResponsibleId)
            task.userResponsible = user;
        }
        task.updatedAt = new Date();

        await this.taskRepository.save(task);
        const updateTaskResponse = new UpdateTaskResponseDto();
        updateTaskResponse.result = true;

        return updateTaskResponse;
    }

    async deleteTask(deleteTask: DeleteTaskInputDto){
        const task = await this.taskRepository.findById(deleteTask.taskId);

        task.deleted = true;
        task.updatedAt = new Date();

        await this.taskRepository.save(task);
        const deleteTaskResponse = new DeleteTaskResponseDto();
        deleteTaskResponse.result = true;

        return deleteTaskResponse;
    }

    async finishTask(finishTaskInput: FinishTaskInputDto){
        const task = await this.taskRepository.findById(finishTaskInput.taskId);
        task.finished = true;
        task.updatedAt = new Date();

        await this.taskRepository.save(task);
        const finishTaskResponse = new FinishTaskResponseDto();
        finishTaskResponse.result = true;

        return finishTaskResponse;
    }
    async getTasksActivesByUser(getTaskActiveByUser: GetTaskActiveByUser){
        const task = await this.taskRepository.getTaskActiveByUserId(getTaskActiveByUser.userId);
        const getTaskActiveResponse = new GetTaskActivesByUserResponse();
        getTaskActiveResponse.task = task[0];
        getTaskActiveResponse.count = task[1];

        return getTaskActiveResponse;
    }
    async getTasksFinishedByUser(getTaskFinishedByUser: GetTaskFinishedInputDto){
        const task = await this.taskRepository.getTaskfinishedByUserId(getTaskFinishedByUser.userId);
        const getTaskFinishedResponse = new GetTaskFinishedsByUserResponse();
        getTaskFinishedResponse.task = task[0];
        getTaskFinishedResponse.count = task[1];

        return getTaskFinishedResponse;
    }
    async getTasksDeletedByUser(getTaskDeletedByUser: GetTaskDeletedInputDto){
        const task = await this.taskRepository.getTaskDeletedByUserId(getTaskDeletedByUser.userId);
        const getTaskDeletedResponse = new GetTaskDeletedsByUserResponse();
        getTaskDeletedResponse.task = task[0];
        getTaskDeletedResponse.count = task[1];

        return getTaskDeletedResponse;
    }
}