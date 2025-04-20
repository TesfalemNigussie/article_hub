import { IsNotEmpty, IsUUID, IsOptional, IsNumberString } from "class-validator";

export class FindArticleByAuthorDto {
    @IsNotEmpty()
    @IsUUID()
    authorId: string;

    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}