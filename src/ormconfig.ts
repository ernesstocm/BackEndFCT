import { SnakeNamingStrategy } from './strategy/snake.naming';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const config: TypeOrmModuleOptions = {
    type: 'mysql',
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "proyectfct",
    synchronize: false,
    namingStrategy: new SnakeNamingStrategy(),
    entities: [__dirname + '/database/entity/*'],
    migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
    cli: {
        migrationsDir: 'src/database/migrations',
    },

};

export = config;
