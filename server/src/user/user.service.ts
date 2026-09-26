import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LIMIT } from "./constants/pagination.constants";
import { PaginationQueryDto } from "../common/dto/pagination.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

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
        await this.checkIfUserExists(userId);

        const follows = await this.prismaService.follow.findMany({
            where: { followingId: userId },
            include: {
                follower: {
                    omit: { passwordHash: true },
                },
            },
        });

        return follows.map(f => f.follower);
    }

    async getUserFollowings(userId: string) {
        await this.checkIfUserExists(userId);

        const follows = await this.prismaService.follow.findMany({
            where: { followerId: userId },
            include: {
                following: {
                    omit: { passwordHash: true },
                },
            },
        });

        return follows.map(f => f.following);
    }

    async updateProfile(updateProfileDto: UpdateProfileDto, userId: string) {
        const updatedUser = await this.prismaService.user.update({
            where: { userId },
            data: {
                ...updateProfileDto,
            },
        });

        return updatedUser;
    }

    async followUser(targetUserId: string, currentUserId: string) {
        if (targetUserId === currentUserId) throw new BadRequestException("Cannot follow yourself");

        const follow = await this.prismaService.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: targetUserId,
                },
            },
        });

        if (follow) throw new ConflictException("Already following this user");

        await this.prismaService.follow.create({
            data: {
                followerId: currentUserId,
                followingId: targetUserId,
            },
        });

        return { success: true };
    }

    async updateUserAvatar(userId: string) {}
    async deleteUserAvatar(userId: string) {}

    private async checkIfUserExists(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { userId },
            select: { userId: true },
        });

        if (!user) throw new NotFoundException(`User with ${userId} id not found`);
    }
}
