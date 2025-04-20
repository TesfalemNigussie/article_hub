import { IsOptional, IsNumberString } from "class-validator";

export class FindArticleDto {
    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}