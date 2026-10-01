import { Injectable } from "@nestjs/common";
import { S3StorageService } from "../../libs/s3-storage/s3-storage.service";
import { UserWithRelations } from "../args/user.args";
import { Author } from "../args/author.args";

@Injectable()
export class UserMapper {
    constructor(private readonly s3StorageService: S3StorageService) {}

    toResponse(user: UserWithRelations) {
        return {
            userId: user.userId,
            nickname: user.nickname,
            name: user.name,
            bio: user.bio,
            avatarUrl: this.s3StorageService.toUrl(user.avatarKey),
            recipesCount: user._count.recipes,
            followersCount: user._count.followers,
            followingsCount: user._count.followings,
            createdAt: user.createdAt,
        };
    }

    toAuthorResponse(user: Author) {
        return {
            userId: user.userId,
            nickname: user.nickname,
            name: user.name,
            avatarUrl: this.s3StorageService.toUrl(user.avatarKey),
        };
    }
}
