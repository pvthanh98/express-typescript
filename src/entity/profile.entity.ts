import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm"
import { Person } from "./person.entity";

@Entity()
export class Profile {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({
        type:"varchar",
        length: 255
    })
    photo: string

    @OneToOne(() => Person, (person) => person.profile) // specify inverse side as a second parameter
    person: Person
}