import { Entity, Column, PrimaryGeneratedColumn, } from "typeorm";

@Entity()
export class Category {
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
    description: string;
}