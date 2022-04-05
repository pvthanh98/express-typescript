import { getRepository } from "typeorm";
import { Question } from "../entity/question.entity";

export const QuestionRepository = getRepository(Question).extend({
    findOneByTitle(title: string): Promise<Question|null> {
        return this.createQueryBuilder("question")
            .where("question.title = :title", { title })
            .getOne()
    },
});