import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { PaginationDto } from "../common/dto/pagination.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Query() query: PaginationDto) {
        return await this.userService.getAllUsers(query);
    }

    @Get(":id")
    async getUserById(@Body() userId: string) {
        return await this.userService.getUserById(userId);
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
    async updateUserAvatar(@CurrentUser("userId") userId: string) {
        return await this.userService.updateUserAvatar(userId);
    }

    @Delete()
    async deleteUserAvatar(@CurrentUser("userId") userId: string) {
        return await this.userService.deleteUserAvatar(userId);
    }
}
