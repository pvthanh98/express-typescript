import { Type } from 'class-transformer';
import { IsArray, IsOptional, IsString, IsUUID, ValidateNested } from 'class-validator';

class QuestionTypeDto {
    @IsUUID()
    id: string;
}

export class CreateQuestionDto {
    @IsString()
    title: string;

    @IsString()
    text: string;

    @IsArray()
    @ValidateNested({each:true})
    @IsOptional()
    @Type(()=> QuestionTypeDto)
    questionTypes?: Array<QuestionTypeDto>;

}

