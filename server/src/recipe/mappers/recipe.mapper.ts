import { Injectable } from "@nestjs/common";
import { UserMapper } from "../../user/mappers/user.mapper";
import { RecipeWithRelations } from "../args/recipe.args";
import { S3StorageService } from "./../../libs/s3-storage/s3-storage.service";

@Injectable()
export class RecipeMapper {
    constructor(
        private readonly s3StorageService: S3StorageService,
        private readonly userMapper: UserMapper,
    ) {}

    toRecipeResponse(recipe: RecipeWithRelations) {
        return {
            recipeId: recipe.recipeId,
            title: recipe.title,
            description: recipe.description,
            imageUrl: this.s3StorageService.toUrl(recipe.imageKey),
            difficulty: recipe.difficulty,
            cookTime: recipe.cookTime,
            calories: recipe.calories,
            servings: recipe.servings,
            user: this.userMapper.toAuthorResponse(recipe.user),
            ingredients: recipe.ingredients.map(i => ({
                name: i.name,
                amount: i.amount,
                unit: i.unit,
            })),
            tags: recipe.tags.map(t => ({ id: t.tag.tagId, name: t.tag.name })),
            createdAt: recipe.createdAt,
        };
    }

    toRecipeResponseList(recipes: RecipeWithRelations[]) {
        return recipes.map(recipe => this.toRecipeResponse(recipe));
    }

    toPageRecipeResponse(recipe: RecipeWithRelations) {
        return {
            ...this.toRecipeResponse(recipe),
            steps: recipe.steps.map(step => ({
                order: step.order,
                content: step.content,
                imageUrl: this.s3StorageService.toUrl(step.imageKey),
            })),
        };
    }
}
