import { CreateUserInputDto } from './../dto/create-user.input.dto';
import { UserDto } from './../dto/user.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';

@Resolver()

export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(returns => [UserDto])
    async getAllUsers() {
        return await this.userService.findAllUsersActives();
    }
    @Query(returns => [UserDto])
    async getAllUsersDeleted() {
        return await this.userService.findAllUsersDeleted();
    }

    @Mutation()
    async createUser(
        @Args('createUserInputDto') createUserInput: CreateUserInputDto,
    ) {
        return await this.userService.createUser(createUserInput);
    }



}