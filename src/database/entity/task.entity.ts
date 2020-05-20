import { StateTaskEnum } from './../enum/state-task.enum';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { UserEntity } from './user.entity';

@Entity()
export class TaskEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    startDate: Date;

    @Column()
    endDate: Date;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column({
        type: 'enum',
        enum: StateTaskEnum,
    })
    state: StateTaskEnum;

    @Column({
        default: 0,
    })
    finished: boolean;

    @Column({
        default: 0,
    })
    deleted: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @ManyToOne(type => UserEntity)
    userResponsible: UserEntity;
}