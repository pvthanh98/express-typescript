import { Request, Response } from 'express';
import { 
    createCategoryService,
    getCategoryService
} from '../services/category.service';
import { validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
import SignupUserDto from '../validators/signup-user.dto';
import CreateCategoryDto from '../validators/create-category.dto';
import { convertError } from '../base/utils';

/** category controller */
const categoryController = (req: Request, res: Response) => {
    const categoryData = plainToInstance(CreateCategoryDto, req.body);
    validate(categoryData).then(async errors => {
        if (errors.length > 0) 
            return res.status(400).send(convertError(errors));
        const results = await createCategoryService(categoryData);  
        return res.send(results);
    });
}

const getCategoryController = async (req: Request, res: Response) => {
    const result = await getCategoryService();
    return res.json(result)
}

export {
    categoryController,
    getCategoryController
}