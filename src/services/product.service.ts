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
            .createQueryBuilder()
            .select()
        
        if (search) 
            /** When user searching */
            queryBuilder
                .where('name ILIKE :searchTerm', {searchTerm: `%${search}%`})

        if (noPagination){
            const results = await queryBuilder
                .getMany();
            return paginateResponse(results, query);
        }
        
        console.log(__dirname)
        const results = await queryBuilder
            .skip(offset)
            .take(limit)
            .getManyAndCount();

        return paginateResponse(results, query);
    }
}