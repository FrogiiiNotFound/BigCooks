import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from "./user/user.module";
import { PrismaModule } from "./prisma/prisma.module";
import { RecipeModule } from "./recipe/recipe.module";
import { CommentModule } from './comment/comment.module';
import { S3StorageModule } from './libs/s3-storage/s3-storage.module';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        UserModule,
        PrismaModule,
        RecipeModule,
        CommentModule,
        S3StorageModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
