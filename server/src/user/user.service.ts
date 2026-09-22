import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { PaginationQueryDto } from "./dto/pagination-query.dto";
import { LIMIT } from "./constants/pagination.constants";

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}
    async getAllUsers({ page }: PaginationQueryDto) {
        const [users, total] = await this.prismaService.$transaction([
            this.prismaService.user.findMany({
                skip: (page - 1) * LIMIT,
                take: LIMIT,
                orderBy: { userId: "asc" },
                omit: { passwordHash: true },
            }),
            this.prismaService.user.count(),
        ]);

        return {
            users,
            meta: {
                page,
                totalPages: Math.ceil(total / LIMIT),
            },
        };
    }

    async getUserById(userId: string) {
        const user = this.prismaService.user.findFirst({
            where: {
                userId,
            },
            omit: {
                passwordHash: true,
            },
        });

        return user;
    }

    async getUserFollowers(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                userId,
            },
            include: {
                followers: true,
            },
            omit: {
                passwordHash: true,
            },
        });

        if (!user) throw new NotFoundException(`User with ${userId} id not found`);

        const followerIds = user.followers.map(follower => follower.followerId);

        const followers = this.prismaService.user.findMany({
            where: {
                userId: {
                    in: followerIds,
                },
            },
        });

        return followers;
    }

    async addFriendToUser(targetUserId: string, currentUserId: string) {}
}
