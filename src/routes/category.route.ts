import { Router } from 'express';
import { categoryController } from '../controllers/category.controller';

const router = Router();

/** Create category */
router.post('', categoryController);

export {
    router
};