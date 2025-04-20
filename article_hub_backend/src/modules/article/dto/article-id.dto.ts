import { IsUUID, IsOptional } from "class-validator";

export class ArticleIdDto {
    @IsOptional()
    @IsUUID()
    id: string;
}