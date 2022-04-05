import { plainToInstance } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from 'express';
import { convertError } from "../base/utils";

export const validateMiddleware = (dto: any)=> {
    return function (req: Request, res: Response, next: NextFunction) {
      if(dto) {
          const productData : {} = plainToInstance(dto, req.body);
          validate(productData).then(async (errors) => {
            if (errors.length > 0) return res.status(400).send(convertError(errors));
            next();
          });
      } else {
        next();
      }
      
    };
}; 