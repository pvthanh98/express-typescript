import { Router } from 'express';
import ProductController from '../controllers/product.controller';
import { validateMiddleware } from '../middlewares/validate.middleware';
import CreateProductDto from '../validators/create-product.dto';


const router = Router();
const productController = new ProductController();

/** Create category */
router.post('/', validateMiddleware(CreateProductDto), productController.createProduct);
router.get('/', productController.getProducts);
router.put('/:id', productController.updateProduct);
router.delete('/:id', productController.deleteProduct);

export {
    router
};