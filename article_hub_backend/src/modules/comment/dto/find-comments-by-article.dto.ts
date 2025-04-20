import { IsNotEmpty, IsUUID } from "class-validator";

export class FindCommentsByArticleDto {
    @IsUUID()
    @IsNotEmpty()
    articleId: string;


}