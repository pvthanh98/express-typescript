import CreateCategoryDto from '../validators/create-category.dto';
import UpdateCategoryDto from '../validators/update-category.dto';
import { getRepository } from 'typeorm';
import { Category } from '../entity/category.entity';
import { CATEGORY_ERROR } from '../base/templates/error/category-error.template';
import { Product } from '../entity/product.entity';

const createCategoryService = async (categoryData: CreateCategoryDto) : Promise<any> => {
    const categoryRepo = await getRepository(Category);
    const category = await categoryRepo.create(categoryData);
    await categoryRepo.save(category);
    return category;
}

const getCategoryService = async () : Promise<any> => {
    const categoryRepo = await getRepository(Category);
    const categories = await categoryRepo.find()
    return categories;
}

const updateCategoryService = async (categoryId: string,categoryData: UpdateCategoryDto) : Promise<any> => {
    const categoryRepo = await getRepository(Category);

    const result = await categoryRepo.update({
        id: categoryId
    },{...categoryData});

    if (result.affected!= undefined && result.affected == 0){
        return {
            err: CATEGORY_ERROR.NOT_FOUND,
            data: null
        }
    }

    return {
        err:null,
        data: await categoryRepo.findOne({
            where:{
                id:categoryId
            }
        })
    }
}

const deleteCategoryService = async (categoryId: string) : Promise<any> => {
    const categoryRepo = await getRepository(Category);
    const productRepo = await getRepository(Product);

    const category = await categoryRepo.findOne({
        where:{
            id: categoryId
        }
    });

    if (category) {
        const totalProductAsignedToCategory = await productRepo.count({
            where:{
                category
            }
        });
        if (totalProductAsignedToCategory > 0) 
            return {
                err: CATEGORY_ERROR.PRODUCT_ASSIGNED,
                data: null
            }
        
        return {
            err: null,
            data: await categoryRepo.delete(category)
        }
    }

    return {
        err: CATEGORY_ERROR.NOT_FOUND,
        data: null
    }
}

export {
    createCategoryService,
    getCategoryService,
    updateCategoryService,
    deleteCategoryService
}