import { IsOptional, IsString, IsUUID } from 'class-validator';

export default class CreateProductDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUUID()
    categoryId: string;

}

