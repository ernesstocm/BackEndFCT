import { CreateUserResponseDto } from './../dto/create-user.response.dto';
import { UserEntity } from 'src/database/entity/user.entity';
import { CreateUserInputDto } from './../dto/create-user.input.dto';
import { UserRepository } from '../../database/repositories/user.entity.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {

    constructor(
        readonly userRepository: UserRepository,
    ) { }

    async findAllUsersActives() {
        return await this.userRepository.findAllUser();
    }
    async findAllUsersDeleted() {
        return await this.userRepository.findAllUserDeleted();
    }

    async createUser(createUserInput: CreateUserInputDto){
        const user = new UserEntity();

        user.nick = createUserInput.nick;
        user.password = createUserInput.password;
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
}