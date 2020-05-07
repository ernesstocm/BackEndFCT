import { RoleEnum } from './../../database/enum/rol-user.enum';

export class CreateUserInputDto {
    nick: string;
    password: string;
    email: string;
    phone: string;
    role: RoleEnum;
    urlImage: string;
}