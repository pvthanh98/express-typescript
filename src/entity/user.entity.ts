import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:"varchar",
        length:255,
        unique:true
    })
    email: string;

    @Column({
        type:"varchar",
        length: 255
    })
    firstName: string;

    @Column({
        type:"varchar",
        length: 255
    })
    lastName: string;

    @Column({
        type:"varchar",
        length: 255
    })
    address: string;

    @Column({
        type:"varchar",
        length: 255,
        select:false
    })
    password: string;
}