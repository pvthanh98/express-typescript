import { NextFunction, Request, Response } from "express";
import { QuestionService } from "../services/question.service";

export class QuestionController {
  service: QuestionService;

  constructor() {
    this.service = new QuestionService();
  }

  createQuestion = async (req: Request, res: Response, next: NextFunction) => {
    const results = await this.service.createQuestion(req.body);
    return res.send(results);
  };

}
