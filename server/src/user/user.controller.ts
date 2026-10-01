import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    UploadedFile,
} from "@nestjs/common";
import { UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { PaginationDto } from "../common/dto/pagination.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UserService } from "./user.service";
import { FILE_MAX_SIZE } from "../common/constants/storage.constants";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Query() query: PaginationDto) {
        return await this.userService.getAllUsers(query);
    }

    @Get(":id")
    async getUserById(@Param("id") userId: string) {
        return await this.userService.getUserById(userId);
    }

    @Get(":id/profile")
    async getUserProfile(
        @Param("id") userId: string,
        @CurrentUser("userId") currentUserId: string,
    ) {
        return await this.userService.getUserProfile(userId, currentUserId);
    }

    @Get(":id/followers")
    async getUserFollowers(@Param("id") userId: string) {
        return await this.userService.getUserFollowers(userId);
    }

    @Get(":id/followings")
    async getUserFollowings(@Param("id") userId: string) {
        return await this.userService.getUserFollowings(userId);
    }

    @Post(":id/following")
    async followUser(
        @Param("id") targetUserId: string,
        @CurrentUser("userId") currentUserId: string,
    ) {
        return await this.userService.followUser(targetUserId, currentUserId);
    }

    @Patch("me")
    async updateProfile(
        @Body() updateProfileDto: UpdateProfileDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.userService.updateProfile(updateProfileDto, userId);
    }

    @Patch("me/avatar")
    @UseInterceptors(FileInterceptor("file", { limits: { fileSize: FILE_MAX_SIZE } }))
    async updateUserAvatar(
        @CurrentUser("userId") userId: string,
        @UploadedFile() file: Express.Multer.File,
    ) {
        return await this.userService.updateUserAvatar(userId, file);
    }

    @Delete("me/avatar")
    async deleteUserAvatar(@CurrentUser("userId") userId: string) {
        return await this.userService.deleteUserAvatar(userId);
    }
}
