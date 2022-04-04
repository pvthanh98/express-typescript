import { Request, Response } from 'express';
import { 
    createCategoryService,
    deleteCategoryService,
    getCategoryService,
    updateCategoryService
} from '../services/category.service';
import { validate } from 'class-validator';
import { plainToInstance } from "class-transformer";
import UpdateCategoryDto from '../validators/update-category.dto';
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


const updateCategoryController = async (req: Request, res: Response) => {
    const categoryData = plainToInstance(UpdateCategoryDto, req.body);
    validate(categoryData).then(async errors => {
        if (errors.length > 0) 
            return res.status(400).send(convertError(errors));
        const results = await updateCategoryService(req.params.id, categoryData);  
        if (results.err) return res.status(400).send(results.err);
        return res.send(results.data)
    });
}

const deleteCategoryController = async (req: Request, res: Response) => {
    const results = await deleteCategoryService(req.params.id);
    if (results && results.err) return res.status(400).send(results.err);
    return res.send(results.data)
}

export {
    categoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
}