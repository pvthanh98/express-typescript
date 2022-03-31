import { Router } from 'express';
import ProductController from '../controllers/product.controller';


const router = Router();
const productController = new ProductController();

/** Create category */
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);


export {
    router
};