import { Module } from "@nestjs/common";
import { RecipeService } from "./recipe.service";
import { RecipeController } from "./recipe.controller";
import { RecipeMapper } from "./mappers/recipe.mapper";
import { UserMapper } from "../user/mappers/user.mapper";
import { S3StorageModule } from "../libs/s3-storage/s3-storage.module";
import { CommentModule } from "../comment/comment.module";

@Module({
    imports: [S3StorageModule, CommentModule],
    controllers: [RecipeController],
    providers: [RecipeService, RecipeMapper, UserMapper],
})
export class RecipeModule {}
