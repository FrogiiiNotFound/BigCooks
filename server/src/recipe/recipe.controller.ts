import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
    UploadedFiles,
    UseGuards,
    UseInterceptors,
} from "@nestjs/common";
import { AnyFilesInterceptor, FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { AuthenticatedGuard } from "../auth/guards/authenticated.guard";
import { CommentService } from "../comment/comment.service";
import { CommentPaginationDto } from "../comment/dto/comment-pagination.dto";
import { CreateCommentDto } from "../comment/dto/create-comment.dto";
import { CreateRecipeDto } from "./dto/create-recipe.dto";
import { RecipePaginationDto } from "./dto/recipe-pagination.dto";
import { UpdateRecipeDto } from "./dto/update-recipe.dto";
import { RecipeService } from "./recipe.service";

@Controller("recipe")
export class RecipeController {
    constructor(
        private readonly recipeService: RecipeService,
        private readonly commentService: CommentService,
    ) {}

    @Post()
    @UseGuards(AuthenticatedGuard)
    @UseInterceptors(AnyFilesInterceptor({ limits: { fileSize: 5 + 1024 * 1024, files: 21 } }))
    async createRecipe(
        @Body() createRecipeDto: CreateRecipeDto,
        @CurrentUser("userId") userId: string,
        @UploadedFiles() files: Express.Multer.File[],
    ) {
        return await this.recipeService.createRecipe(createRecipeDto, userId, files);
    }

    @Post(":id/comments")
    async createComment(
        @Param("id") recipeId: string,
        @Body() createCommentDto: CreateCommentDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.commentService.createComment(recipeId, createCommentDto, userId);
    }

    @Get(":id/comments")
    async getRecipeComments(
        @Param("id") recipeId: string,
        @Query() paginationQuery: CommentPaginationDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.commentService.getRecipeComments(recipeId, paginationQuery, userId);
    }

    @Get()
    async getAllRecipes(@Body() recipePaginationDto: RecipePaginationDto) {
        return await this.recipeService.getAllRecipes(recipePaginationDto);
    }

    @Get(":id")
    async getRecipeById(@Param("id") recipeId: string, @CurrentUser('userId') userId: string) {
        return await this.recipeService.getRecipeById(recipeId, userId);
    }

    @Patch(":id")
    async updateRecipe(
        @Param("id") recipeId: string,
        @Body() updateRecipeDto: UpdateRecipeDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.recipeService.updateRecipe(updateRecipeDto, recipeId, userId);
    }

    @Patch(":id/main-img")
    @UseInterceptors(
        FileInterceptor("image", {
            limits: {
                fileSize: 5 * 1024 * 1024,
            },
        }),
    )
    async updateRecipeImage(
        @Param("id") recipeId: string,
        @CurrentUser("userId") userId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.recipeService.updateRecipeImage(recipeId, userId, file);
    }

    @Delete(":id")
    async deleteRecipe(@Param("id") recipeId: string, @CurrentUser("userId") userId: string) {
        return await this.recipeService.deleteRecipe(recipeId, userId);
    }
}
