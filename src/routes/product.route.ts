import { Router } from 'express';
import ProductController from '../controllers/product.controller';


const router = Router();
const productController = new ProductController();

/** Create category */
router.post('/', productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export {
    router
};