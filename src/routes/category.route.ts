import { Router } from 'express';
import { 
    categoryController,
    getCategoryController
} from '../controllers/category.controller';

const router = Router();

/** Create category */
router.post('', categoryController);
router.get('', getCategoryController);

export {
    router
};