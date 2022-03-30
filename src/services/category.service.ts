import CreateCategoryDto from '../validators/create-category.dto';
import { getRepository } from 'typeorm';
import { Category } from '../entity/category.entity';

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

export {
    createCategoryService,
    getCategoryService
}