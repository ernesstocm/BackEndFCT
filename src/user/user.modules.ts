import { BcryptHelper } from './../strategy/helper/bcrypt.helper';
import { UserRepositoryProvider } from 'src/database/repositories/user.entity.repository';
import { Module } from "@nestjs/common";
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from "src/database/entity/user.entity";
import { UserService } from "./service/user.service";
import { UserResolver } from "./resolver/user.resolver";

@Module({
    imports: [
        TypeOrmModule.forFeature([
            UserEntity,
        ]),
    ],
    providers: [UserService, UserResolver, UserRepositoryProvider, BcryptHelper],
    exports: [UserService],
})
export class UserModule { }