import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";
import { Difficulty } from "../../../generated/prisma/enums";
import { PaginationDto } from "../../common/dto/pagination.dto";

export class RecipePaginationDto extends PaginationDto {
    @IsOptional()
    @IsEnum(Difficulty, { message: "Difficulty must be easy, medium or hard" })
    difficulty: Difficulty;

    @IsOptional()
    @Type(() => Number)
    @IsInt({ message: "Cook time must be a number" })
    cookTime: number;

    @IsOptional()
    @IsString({ message: "Ingredients must be a string" })
    ingredients: string;

    @IsOptional()
    @IsString({ message: "Tags must be a string" })
    tags: string;

    @IsOptional()
    @IsString({ message: "Servings must be a string" })
    servings: string;
}
