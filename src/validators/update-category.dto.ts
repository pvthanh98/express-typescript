import { IsOptional, IsString } from 'class-validator';

export default class UpdateCategoryDto {

    @IsString()
    @IsOptional()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

}

