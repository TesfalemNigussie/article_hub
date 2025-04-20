import { Category } from "@prisma/client";
import { IsEnum, IsNotEmpty, IsString, IsUUID } from "class-validator"

export class CreateArticleDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsNotEmpty()
    content: string;

    @IsEnum(Category)
    @IsNotEmpty()
    category: Category;

    @IsUUID()
    @IsNotEmpty()
    authorId: string;

    imageUrl: string;
}
