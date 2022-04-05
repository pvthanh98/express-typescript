import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToMany,
    JoinTable,
} from "typeorm"
import { QuestionType } from "./question_type.entity";

@Entity()
export class Question {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type:"varchar",
        length:255
    })
    title: string

    @Column({
        type:"text",
        nullable:true,
        default: null
    })
    text: string

    @ManyToMany(() => QuestionType, (questionType) => questionType.questions)
    @JoinTable()
    questionTypes: QuestionType[]
}