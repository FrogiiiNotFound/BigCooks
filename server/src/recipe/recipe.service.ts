import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { RecipePaginationDto } from "./dto/recipe-pagination.dto";

@Injectable()
export class RecipeService {
    constructor(private readonly prismaService: PrismaService) {}

    async createRecipe(createRecipeDto: CreateRecipeDto, userId: string) {
        const { ingredients, steps, tagIds, ...recipeData } = createRecipeDto;

        const recipe = await this.prismaService.recipe.create({
            data: {
                ...recipeData,
                userId,
                ingredients: {
                    create: ingredients.map(ingredient => ({
                        name: ingredient.name,
                        amount: ingredient.amount,
                        unit: ingredient.unit,
                    })),
                },
                steps: {
                    create: steps.map(step => ({
                        order: step.order,
                        content: step.content,
                    })),
                },
                tags: {
                    create: tagIds.map(tagId => ({
                        tagId,
                    })),
                },
            },
        });

        return recipe;
    }

    async getAllRecipes(recipePaginationDto: RecipePaginationDto) {
        const page = recipePaginationDto.page || 1;
        const limit = recipePaginationDto.limit || 10;
        const ingredients = recipePaginationDto.ingredients?.split(",");
        const tags = recipePaginationDto.tags?.split(",");

        return await this.prismaService.recipe.findMany({
            where: {
                difficulty: recipePaginationDto.difficulty,
                cookTime: recipePaginationDto.cookTime,
                ingredients: {
                    some: {
                        name: { in: ingredients },
                    },
                },
                tags: {
                    some: {
                        tag: { in: tags },
                    },
                },
            },
            skip: (page - 1) * limit,
            take: limit,
        });
    }

    async getRecipeById(recipeId: string) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: {
                recipeId,
            },
        });

        if (!recipe) throw new NotFoundException(`Recipe with ${recipeId} id not found`);

        return recipe;
    }

    async updateRecipe(updateRecipeDto: UpdateRecipeDto, recipeId: string, userId: string) {
        const recipe = await this.checkIfRecipeExists(recipeId);

        if (recipe.userId !== userId) {
            throw new ForbiddenException("You don't have permission to update this recipe");
        }

        const { ingredients, steps, tagIds, ...recipeData } = updateRecipeDto;

        const updatedRecipe = await this.prismaService.recipe.update({
            where: {
                recipeId,
            },
            data: {
                ...recipeData,
                ...(ingredients && {
                    ingredients: {
                        deleteMany: {},
                        create: ingredients.map(ingredient => ({
                            name: ingredient.name,
                            amount: ingredient.amount,
                            unit: ingredient.unit,
                        })),
                    },
                }),
                ...(steps && {
                    steps: {
                        deleteMany: {},
                        create: steps.map(step => ({
                            order: step.order,
                            content: step.content,
                        })),
                    },
                }),
                ...(tagIds && {
                    tags: {
                        deleteMany: {},
                        create: tagIds.map(tagId => ({ tagId })),
                    },
                }),
            },
        });

        return updatedRecipe;
    }

    async deleteRecipe(recipeId: string, userId: string) {
        const recipe = await this.checkIfRecipeExists(recipeId);

        if (recipe.userId !== userId) {
            throw new ForbiddenException("You don't have permission to delete this recipe");
        }

        await this.prismaService.recipe.delete({
            where: {
                recipeId,
            },
        });

        return { success: true };
    }

    private async checkIfRecipeExists(recipeId: string) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: {
                recipeId,
            },
        });

        if (!recipe) throw new NotFoundException(`Recipe with ${recipeId} id not found`);

        return recipe;
    }
}
