import { Type } from "class-transformer";
import {
    IsArray,
    IsEnum,
    IsInt,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsUUID,
    Max,
    MaxLength,
    Min,
    MinLength,
    ValidateNested,
} from "class-validator";
import { Difficulty } from "../../../generated/prisma/enums";
import { IngredientDto } from "./ingredient.dto";
import { StepDto } from "./step.dto";

export class CreateRecipeDto {
    @IsNotEmpty()
    @IsString({ message: "Title must be a string" })
    @MinLength(5, { message: "Title must be at least 5 characters" })
    @MaxLength(100, { message: "Title must not exceed 100 characters" })
    title: string;

    @IsNotEmpty()
    @IsString({ message: "Description must be a string" })
    @MinLength(50, { message: "Description must be at least 50 characters" })
    @MaxLength(1000, { message: "Description must not exceed 1000 characters" })
    description: string;

    @IsOptional()
    @IsEnum(Difficulty, { message: "Difficulty must be easy, medium or hard" })
    difficulty: Difficulty;

    @IsOptional()
    @IsInt({ message: "Cook time must be a number" })
    @Min(1, { message: "Cook time must be at least 1 minute" })
    @Max(1440, { message: "Cook time must not exceed 1440 minutes" })
    cookTime: number;

    @IsOptional()
    @IsInt({ message: "Calories must be a number" })
    @Min(0, { message: "Calories must be at least 0" })
    @Max(10000, { message: "Calories must not exceed 10000" })
    calories: number;

    @IsOptional()
    @IsInt({ message: "Servings must be a number" })
    @Min(0, { message: "Servings must be at least 1" })
    @Max(100, { message: "Servings must not exceed 100" })
    servings: number;

    @IsNotEmpty()
    @IsArray({ message: "Ingredients must be an array" })
    @ValidateNested({ each: true })
    @Type(() => IngredientDto)
    ingredients: IngredientDto[];

    @IsNotEmpty()
    @IsArray({ message: "Steps must be an array" })
    @ValidateNested({ each: true })
    @Type(() => StepDto)
    steps: StepDto[];

    @IsNotEmpty()
    @IsArray({ message: "Tags must be an array" })
    @IsUUID("4", { each: true, message: "Each tag id must be a valid UUID" })
    tagIds: string[];
}
