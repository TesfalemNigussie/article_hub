import { Category } from "@prisma/client";
import { IsNotEmpty, IsEnum } from "class-validator";

export class FindArticleByCategoryDto {
    @IsNotEmpty()
    @IsEnum(Category)
    category: Category;
}