import { RoleEnum } from './../../database/enum/rol-user.enum';

export class UserDto {
    id: string;
    nick: string;
    phone: string;
    password: string;
    request_token: string;
    reset_password_token: string;
    reset_password_expires: string;
    role: RoleEnum;
    active: string;
    visible: string;
    createdAt: Date;
    updatedAt: Date;
    companyId: string;
}