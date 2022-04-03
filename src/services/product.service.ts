import CreateProductDto from '../validators/create-product.dto';
import { getRepository } from 'typeorm';
import { Product } from '../entity/product.entity';
import { Category } from '../entity/category.entity';
import { PRODUCT_ERROR } from '../base/templates/error/product-error.template';
import { paginateResponse, processQuery } from '../base/utils';


export default class ProductService {
    createProduct = async (data: CreateProductDto) => {
        const category = await getRepository(Category).findOne({where: { id:data.categoryId } })
        const repository = await getRepository(Product);

        if (category){
            const product = await repository.create({
                category:category,
                ...data
            });
            return {
                err: null,
                data: await repository.save(product)
            };
        }

        return {
            err: PRODUCT_ERROR.NOT_FOUND,
            data: null
        }        
    }

    /** Get product services */
    getProduct = async (query: any): Promise<any> => {
        const { limit, search, offset, noPagination} = processQuery(query);
        const productRepo = await getRepository(Product);

        const queryBuilder = await productRepo
            .createQueryBuilder('product')
            .innerJoinAndSelect('product.category', 'category')
            .select([
                'product.id',
                'product.name',
                'product.description',
                'category.name'
            ])
        
        if (search) 
            /** When user searching */
            queryBuilder
                .where('product.name ILIKE :searchTerm', {searchTerm: `%${search}%`})
                .orWhere('category.name ILIKE :searchTerm', {searchTerm: `%${search}%`})

        let response: any;

        if (noPagination){
            console.log("PRINT HERE")
            const results = await queryBuilder
                .getMany();
            response = paginateResponse(results, query);
        } else {
            const results = await queryBuilder
            .skip(offset)
            .take(limit)
            .getManyAndCount();
            response = paginateResponse(results, query);
        }
        
        /** Customize repsonse */
        const {page, totalPage, count, results: results_2} = response;
        const customResponse: any = [];
        for (const product of results_2){
            customResponse.push({
                ...product,
                category: product.category.name
            })
        }

        return {
            page,
            totalPage,
            count,
            results:customResponse
        };
    }
}