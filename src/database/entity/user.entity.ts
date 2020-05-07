import { RoleEnum } from './../enum/rol-user.enum';
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class UserEntity {
    @PrimaryGeneratedColumn('uuid')
    id:string;

    @Column()
    nick: string;

    @Column({ length: 100, nullable: true })
    password: string | undefined;

    @Column({ length: 999, nullable: true })
    requestToken: string | undefined;

    @Column({ length: 20, nullable: true })
    @Index()
    resetPasswordToken: string | undefined;

    @Column({ nullable: true })
    resetPasswordExpires: Date | undefined;

    @Column()
    @Index({ unique: true })
    email: string;

    @Column()
    phone: string;

    @Column({ nullable: true })
    urlImage: string | undefined;

    @Column({
        type: 'enum',
        enum: RoleEnum,
    })
    role: RoleEnum;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
    
    @Column({
        default: 0,
    })
    deleted: boolean;
}
