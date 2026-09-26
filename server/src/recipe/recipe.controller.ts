import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { RecipePaginationDto } from "./dto/recipe-pagination.dto";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";

@Controller("recipe")
export class RecipeController {
    constructor(private readonly recipeService: RecipeService) {}

    @Post()
    async createRecipe(
        @Body() createRecipeDto: CreateRecipeDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.recipeService.createRecipe(createRecipeDto, userId);
    }

    @Get()
    async getAllRecipes(@Body() recipePaginationDto: RecipePaginationDto) {
        return await this.recipeService.getAllRecipes(recipePaginationDto);
    }

    @Get(":id")
    async getRecipeById(@Param() recipeId: string) {
        return await this.recipeService.getRecipeById(recipeId);
    }

    @Patch(":id")
    async updateRecipe(
        @Param() recipeId: string,
        @Body() updateRecipeDto: UpdateRecipeDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.recipeService.updateRecipe(updateRecipeDto, recipeId, userId);
    }

    @Delete(":id")
    async deleteRecipe(@Param() recipeId: string, @CurrentUser("userId") userId: string) {
        return await this.recipeService.deleteRecipe(recipeId, userId);
    }
}
