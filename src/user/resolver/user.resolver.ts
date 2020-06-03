import { DeleteUserInputDto } from './../dto/delete-user.input.dto';
import { UserLoginInputDto } from './../dto/user-login.input.dto';
import { CreateUserInputDto } from './../dto/create-user.input.dto';
import { UserDto } from './../dto/user.dto';
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../service/user.service';
import { ActiveUserInputDto } from '../dto/active-user.input.dto';

@Resolver()

export class UserResolver {
    constructor(
        private readonly userService: UserService,
    ) { }

    @Query(returns => [UserDto])
    async getAllUsers() {
        return await this.userService.findAllUser();
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

    @Mutation()
    async deleteUser(
        @Args('deleteUserInputDto') deleteUserInput: DeleteUserInputDto,
    ) {
        return await this.userService.deleteUser(deleteUserInput);
    }
    @Mutation()
    async activeUser(
        @Args('activeUserInputDto') activeUserInput: ActiveUserInputDto,
    ) {
        return await this.userService.activeUser(activeUserInput);
    }
    
    @Mutation()
    async loginUser(
        @Args('loginUserInput') loginUserInput: UserLoginInputDto,
    ) {
        return await this.userService.loginUser(loginUserInput);
    }



}