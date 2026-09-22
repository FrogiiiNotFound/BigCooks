import { Body, Controller, Get, Param, Post, Query } from "@nestjs/common";
import { UserService } from "./user.service";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { CurrentUser } from "../auth/decorators/current-user.decorator";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async getAllUsers(@Query() query: PaginationQueryDto) {
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

    @Post(":id/following")
    async followUser(
        @Param("id") targetUserId: string,
        @CurrentUser("userId") currentUserId: string,
    ) {
        return await this.userService.addFriendToUser(targetUserId, currentUserId);
    }
}
