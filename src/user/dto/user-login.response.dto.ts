import { UserEntity } from './../../database/entity/user.entity';
export class UserLoginResponseDto{
    user: UserEntity;
    result: boolean;
}