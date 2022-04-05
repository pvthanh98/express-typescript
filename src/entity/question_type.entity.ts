import { Entity, PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from "typeorm"
import { Question } from "./question.entity";

@Entity()
export class QuestionType {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type:"varchar",
        length: 255
    })
    name: string

    @ManyToMany(() => Question, (question) => question.questionTypes)
    questions: Question[]
}