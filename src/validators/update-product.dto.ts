import { IsOptional, IsString, IsUUID } from 'class-validator';

export default class UpdateProductDto {
    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsUUID()
    @IsOptional()
    categoryId: string;

}

