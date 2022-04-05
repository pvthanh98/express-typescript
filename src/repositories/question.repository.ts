import { getRepository, In } from "typeorm";
import { Question } from "../entity/question.entity";
import { QuestionType } from "../entity/question_type.entity";
import { CreateQuestionDto } from '../validators/create-question.dto';

export const QuestionRepository = getRepository(Question).extend({
    
    findOneByTitle(title: string): Promise<Question|null> {
        return this.createQueryBuilder("question")
            .where("question.title = :title", { title })
            .getOne()
    },

    async insertCustom(questionData:CreateQuestionDto): Promise<Question | null> {
        const { questionTypes, ...otherQuestionAttributes } = questionData;
        const question = await this.create({
            ...otherQuestionAttributes
        });
        
        if (questionTypes && questionTypes.length > 0){
            const questionTypeCreated = await getRepository(QuestionType).findBy({
                id: In([...questionTypes.map((questionType:any)=>questionType.id)])
            });
            question.questionTypes = [...questionTypeCreated]
        }

        await this.save(question);
        return question;
    }
});