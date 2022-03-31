import { Router } from 'express';
import { 
    categoryController,
    getCategoryController,
    updateCategoryController,
    deleteCategoryController
} from '../controllers/category.controller';

const router = Router();

/** Create category */
router.post('/', categoryController);
router.get('/', getCategoryController);
router.put('/:id', updateCategoryController);
router.delete('/:id', deleteCategoryController);

export {
    router
};