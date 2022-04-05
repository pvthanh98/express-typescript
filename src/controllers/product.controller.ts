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

  createProduct = async (req: Request, res: Response, next: NextFunction) => {
    // const productData = plainToInstance(CreateProductDto, req.body);
    // validate(productData).then(async (errors) => {
    //   if (errors.length > 0) return res.status(400).send(convertError(errors));
    console.log("HEHAHA")
      const result = await this.service.createProduct(req.body);
      if (!result.err) {
        return res.send(result.data);
      }

      return res.status(400).send(result.err);
  };

  getProducts = async (req: Request, res: Response, next: NextFunction) => {
    return res.send(await this.service.getProduct(req.query));
  };

  updateProduct = async (req: Request, res: Response, next: NextFunction) => {
    const results = await this.service.updateProduct(req.params.id, req.body);
    if (results && results.err) return res.send(results.err);
    return res.send(results.data);
  };

  deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
    const results = await this.service.deleteProduct(req.params.id);
    return res.send(results);
  };
}
