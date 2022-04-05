import { Router } from 'express';
import { QuestionController } from '../controllers/question.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import { CreateQuestionDto } from '../validators/create-question.dto';


const router = Router();
const questionController = new QuestionController();

/** Create category */
router.post('/', validateMiddleware(CreateQuestionDto), questionController.createQuestion);

export default router;