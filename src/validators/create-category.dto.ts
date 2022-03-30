import { IsEmail, IsOptional, IsString } from 'class-validator';

export default class CreateCategoryDto {
    @IsString()
    name: string;

    @IsString()
    @IsOptional()
    description: string;

}

