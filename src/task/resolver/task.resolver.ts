import { CreateTaskInputDto } from './../dto/create-task.input.dto';
import { TaskService } from './../service/task.service';
import { Resolver, Mutation, Args } from "@nestjs/graphql";

@Resolver()

export class TaskResolver {
    constructor(
        private readonly taskService: TaskService,
    ) { }

    @Mutation()
    async createTask(
        @Args('createTaskInput') createTaskInput: CreateTaskInputDto,
    ) {
        return await this.taskService.createTask(createTaskInput);
    }
}