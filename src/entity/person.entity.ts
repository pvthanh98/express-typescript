import { Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn } from "typeorm";
import { Profile } from './profile.entity';

@Entity()
export class Person {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:"varchar",
        length: 255
    })
    name: string;

    @Column({
        type:"text",
        nullable:true,
        default: null
    })
    address: string;

    @OneToOne(() => Profile, (profile) => profile.person)
    @JoinColumn()
    profile: Profile
}