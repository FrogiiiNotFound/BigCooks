import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "./../prisma/prisma.service";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { RecipePaginationDto } from "./dto/recipe-pagination.dto";
import { fileTypeFromBuffer } from "file-type";
import { MIME_TYPE } from "../common/constants/storage.constants";
import { S3StorageService } from "../libs/s3-storage/s3-storage.service";
import { RecipeMapper } from "./mappers/recipe.mapper";
import { recipeArgs } from "./args/recipe.args";

@Injectable()
export class RecipeService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3StorageService: S3StorageService,
        private readonly recipeMapper: RecipeMapper,
    ) {}

    async createRecipe(
        createRecipeDto: CreateRecipeDto,
        userId: string,
        files: Express.Multer.File[],
    ) {
        const { ingredients, steps, tagIds, ...recipeData } = createRecipeDto;

        const filesByField = new Map(files.map(f => [f.fieldname, f]));

        const uploadImage = async (file?: Express.Multer.File) => {
            if (!file) return null;

            const type = await fileTypeFromBuffer(file.buffer);

            if (!type || !MIME_TYPE.has(file.mimetype)) {
                throw new BadRequestException("Unsupported file type");
            }

            const { fileKey } = await this.s3StorageService.uploadFile(
                { ...file, mimetype: type.mime, originalname: `image.${type.ext}` },
                "recipes",
            );

            return fileKey;
        };

        const mainImageKey = await uploadImage(filesByField.get("image"));
        const stepImageKeys = await Promise.all(
            steps.map(step => uploadImage(filesByField.get(`step-${step.order}`))),
        );

        const recipe = await this.prismaService.recipe.create({
            data: {
                ...recipeData,
                userId,
                imageKey: mainImageKey,
                ingredients: {
                    create: ingredients.map(ingredient => ({
                        name: ingredient.name,
                        amount: ingredient.amount,
                        unit: ingredient.unit,
                    })),
                },
                steps: {
                    create: steps.map((step, i) => ({
                        order: step.order,
                        content: step.content,
                        imageKey: stepImageKeys[i],
                    })),
                },
                tags: {
                    create: tagIds.map(tagId => ({ tagId })),
                },
            },
            ...recipeArgs(),
        });

        return this.recipeMapper.toPageRecipeResponse(recipe);
    }

    async getAllRecipes(recipePaginationDto: RecipePaginationDto) {
        const page = recipePaginationDto.page || 1;
        const limit = recipePaginationDto.limit || 10;
        const ingredients = recipePaginationDto.ingredients?.split(",");
        const tags = recipePaginationDto.tags?.split(",");

        const recipes = await this.prismaService.recipe.findMany({
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
            ...recipeArgs(),
            skip: (page - 1) * limit,
            take: limit,
        });

        return this.recipeMapper.toRecipeResponseList(recipes);
    }

    async getRecipeById(recipeId: string, userId: string) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: {
                recipeId,
            },
            ...recipeArgs(),
        });

        if (!recipe) throw new NotFoundException(`Recipe with ${recipeId} id not found`);

        const existingView = await this.prismaService.recipeView.findUnique({
            where: {
                recipeId_userId: {
                    recipeId,
                    userId,
                },
            },
        });

        if (!existingView) {
            await this.prismaService.$transaction([
                this.prismaService.recipeView.create({
                    data: {
                        recipeId,
                        userId,
                    },
                }),

                this.prismaService.recipe.update({
                    where: {
                        recipeId,
                    },
                    data: {
                        viewsCount: {
                            increment: 1,
                        },
                    },
                }),
            ]);

            recipe.views += 1;
        }

        return this.recipeMapper.toPageRecipeResponse(recipe);
    }

    async updateRecipe(updateRecipeDto: UpdateRecipeDto, recipeId: string, userId: string) {
        console.log("UPDATE DTO:", updateRecipeDto);
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
            ...recipeArgs(),
        });

        return this.recipeMapper.toPageRecipeResponse(updatedRecipe);
    }

    async deleteRecipe(recipeId: string, userId: string) {
        const recipe = await this.checkIfRecipeExists(recipeId);

        if (recipe.userId !== userId) {
            throw new ForbiddenException("You don't have permission to delete this recipe");
        }

        await this.prismaService.recipe.delete({
            where: { recipeId },
        });

        return { success: true };
    }

    async updateRecipeImage(recipeId: string, userId: string, file: Express.Multer.File) {
        const type = await fileTypeFromBuffer(file.buffer);
        if (!type || !MIME_TYPE.has(type.mime)) {
            throw new BadRequestException("Unsupported file type");
        }

        const recipe = await this.prismaService.recipe.findUnique({
            where: { recipeId },
            select: { userId: true, imageKey: true },
        });

        if (!recipe) throw new NotFoundException(`Recipe with ${recipeId} id not found`);
        if (recipe.userId !== userId) {
            throw new ForbiddenException("You don't have permission to update this recipe");
        }

        const { fileKey } = await this.s3StorageService.uploadFile(
            { ...file, mimetype: type.mime, originalname: `image.${type.ext}` },
            "recipes",
        );

        await this.prismaService.recipe.update({
            where: { recipeId },
            data: { imageKey: fileKey },
        });

        if (recipe.imageKey) {
            await this.s3StorageService.deleteFile(recipe.imageKey);
        }

        return { imageUrl: this.s3StorageService.toUrl(fileKey) };
    }

    private async checkIfRecipeExists(recipeId: string) {
        const recipe = await this.prismaService.recipe.findUnique({
            where: { recipeId },
        });

        if (!recipe) throw new NotFoundException(`Recipe with ${recipeId} id not found`);

        return recipe;
    }
}
