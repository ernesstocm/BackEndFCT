import { ActiveUserInputDto } from './../dto/active-user.input.dto';
import { DeleteUserResponseDto } from './../dto/delete-user.response.dto';
import { DeleteUserInputDto } from './../dto/delete-user.input.dto';
import { UserEntity } from './../../database/entity/user.entity';
import { UserLoginResponseDto } from './../dto/user-login.response.dto';
import { UserLoginInputDto } from './../dto/user-login.input.dto';
import { BcryptHelper } from './../../strategy/helper/bcrypt.helper';
import { CreateUserResponseDto } from './../dto/create-user.response.dto';
import { CreateUserInputDto } from './../dto/create-user.input.dto';
import { UserRepository } from '../../database/repositories/user.entity.repository';
import { Injectable } from '@nestjs/common';
import { ActiveUserResponseDto } from '../dto/active-user.response.dto';

@Injectable()
export class UserService {

    constructor(
        readonly bcryptService: BcryptHelper,
        readonly userRepository: UserRepository,
    ) { }

    async findAllUser() {
        return await this.userRepository.findAllUser();
    }
    async findAllUsersDeleted() {
        return await this.userRepository.findAllUserDeleted();
    }

    async createUser(createUserInput: CreateUserInputDto) {
        const user = new UserEntity();

        user.nick = createUserInput.nick;
        user.password = await this.bcryptService.getHash(createUserInput.password);
        user.email = createUserInput.email;
        user.phone = createUserInput.phone;
        user.role = createUserInput.role;
        user.urlImage = createUserInput.urlImage;
        user.createdAt = new Date();
        user.updatedAt = new Date();

        await this.userRepository.save(user);

        const createUserResponseDto = new CreateUserResponseDto();
        createUserResponseDto.result = true;

        return createUserResponseDto;
    }

    async loginUser(userLoginInput: UserLoginInputDto) {
        console.log(userLoginInput)
        const userLoginResponse = new UserLoginResponseDto();
        let user = new UserEntity();
        let response = false;

        if (userLoginInput.email === undefined || userLoginInput.password === undefined) {
            userLoginResponse.result = false;
            return userLoginResponse;
        } else {
            user = await this.userRepository.findUserByEmail(userLoginInput.email);
            if (user != undefined) {
                response = await this.bcryptService.compareHash(userLoginInput.password, user.password);
            } else {
                userLoginResponse.result = false;
                return userLoginResponse;
            }
        }

        if (response) {
            userLoginResponse.user = user;
            userLoginResponse.result = true;
            return userLoginResponse;
        } else {
            userLoginResponse.result = false;
        }

        return userLoginResponse;
    }

    async deleteUser(deleteUserInput: DeleteUserInputDto){
        const user = await this.userRepository.findById(deleteUserInput.idUser);
        user.deleted = true;
        this.userRepository.save(user);

        const response = new DeleteUserResponseDto();
        response.result = true;
        return response;
    }
    async activeUser(activeUserInput: ActiveUserInputDto){
        const user = await this.userRepository.findById(activeUserInput.idUser);
        user.deleted = false;
        this.userRepository.save(user);

        const response = new ActiveUserResponseDto();
        response.result = true;
        return response;
    }
}