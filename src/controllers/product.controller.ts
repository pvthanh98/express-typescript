import { NextFunction, Request, Response } from "express";
import { validate } from "class-validator";
import { plainToInstance } from "class-transformer";
import CreateProductDto from "../validators/create-product.dto";
import { convertError } from "../base/utils";
import ProductService from "../services/product.service";

export default class ProductController {
  service: ProductService;

  constructor() {
    this.service = new ProductService();
  }

  createProduct = (req: Request, res: Response, next: NextFunction) => {
    const productData = plainToInstance(CreateProductDto, req.body);
    validate(productData).then(async (errors) => {
        if (errors.length > 0) return res.status(400).send(convertError(errors));
        const result = await this.service.createProduct(productData);
        if (!result.err) {
          return res.send(result.data)
        }

        return res.status(400).send(result.err);
    });
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(await this.service.getProduct(req.query));
  }
}
