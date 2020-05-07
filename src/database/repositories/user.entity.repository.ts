import { UserEntity } from 'src/database/entity/user.entity';
import { Connection, EntityRepository, SelectQueryBuilder } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked/dist';

@EntityRepository(UserEntity)
export class UserRepository extends BaseRepository<UserEntity> {

    async findAllUser(){
        return this
        .createQueryBuilder('user')
        .where('user.deleted = 0')
        .getMany();
    }
    async findAllUserDeleted(){
        return this
        .createQueryBuilder('user')
        .where('user.deleted = 1')
        .getMany();
    }

    async findById(id: string): Promise<UserEntity> {
        return this.findOneOrFail({ id });
    }
}

export const UserRepositoryProvider = {
    provide: 'UserRepository',
    useFactory: (connection: Connection) => connection.getCustomRepository(UserRepository),
    inject: [Connection],
};
