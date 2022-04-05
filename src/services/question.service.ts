
import { QuestionRepository } from "../repositories/question.repository";
import { CreateQuestionDto } from "../validators/create-question.dto";

export class QuestionService {
  
  questionRepo;
  
  constructor(){
    this.questionRepo = QuestionRepository
  }

  createQuestion = async (questionData: CreateQuestionDto) => {
       const question = await this.questionRepo.insertCustom({
         ...questionData
       })
       return question;
  };

}
