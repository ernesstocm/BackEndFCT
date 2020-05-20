import { FinishTaskInputDto } from './../dto/finish-task.input.dto';
import { DeleteTaskInputDto } from './../dto/delete-task.input.dto';
import { UpdateTaskInputDto } from './../dto/update-task.input.dto';
import { GetTaskDeletedInputDto } from './../dto/get-task-deleted.input.dto';
import { GetTaskFinishedInputDto } from './../dto/get-task-finished.input.dto';
import { GetTaskActiveByUser } from './../dto/get-task-active-by-user.input.dto';
import { CreateTaskInputDto } from './../dto/create-task.input.dto';
import { TaskService } from './../service/task.service';
import { Resolver, Mutation, Args, Query } from "@nestjs/graphql";

@Resolver()

export class TaskResolver {
    constructor(
        private readonly taskService: TaskService,
    ) { }

    @Query()
    async getTaskActive(
        @Args('getTaskActiveInput') getTaskActiveInput : GetTaskActiveByUser
    ){
        return await this.taskService.getTasksActivesByUser(getTaskActiveInput);
    }

    @Query()
    async getTaskFinished(
        @Args('getTaskFinishedInput') getTaskFinishedInput : GetTaskFinishedInputDto
    ){
        return await this.taskService.getTasksFinishedByUser(getTaskFinishedInput);
    }

    @Query()
    async getTaskDeleted(
        @Args('getTaskDeletedInput') getTaskDeletedInput : GetTaskDeletedInputDto
    ){
        return await this.taskService.getTasksDeletedByUser(getTaskDeletedInput);
    }

    @Mutation()
    async createTask(
        @Args('createTaskInputDto') createTaskInput: CreateTaskInputDto,
    ) {
        return await this.taskService.createTask(createTaskInput);
    }

    @Mutation()
    async updateTask(
        @Args('updateTaskInputDto') updateTaskInput: UpdateTaskInputDto,
    ) {
        return await this.taskService.updateTask(updateTaskInput);
    }
    @Mutation()
    async deleteTask(
        @Args('deleteTaskInputDto') deleteTaskInput: DeleteTaskInputDto,
    ) {
        return await this.taskService.deleteTask(deleteTaskInput);
    }
    @Mutation()
    async finishTask(
        @Args('finishTaskInputDto') finishTaskInput: FinishTaskInputDto,
    ) {
        return await this.taskService.finishTask(finishTaskInput);
    }
}