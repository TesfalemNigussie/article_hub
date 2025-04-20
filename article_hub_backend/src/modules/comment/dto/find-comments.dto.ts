import { IsOptional, IsNumberString } from "class-validator";

export class FindCommentsDto {
    @IsOptional()
    @IsNumberString()
    page?: number;

    @IsOptional()
    @IsNumberString()
    limit?: number;
}