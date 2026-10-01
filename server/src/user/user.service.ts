import {
    BadRequestException,
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { LIMIT } from "./constants/pagination.constants";
import { fileTypeFromBuffer } from "file-type";
import { PaginationDto } from "../common/dto/pagination.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { S3StorageService } from "../libs/s3-storage/s3-storage.service";
import { MIME_TYPE } from "../common/constants/storage.constants";
import { userArgs } from "./args/user.args";
import { UserMapper } from "./mappers/user.mapper";

@Injectable()
export class UserService {
    constructor(
        private readonly prismaService: PrismaService,
        private readonly s3StorageService: S3StorageService,
        private readonly userMapper: UserMapper,
    ) {}

    async getAllUsers({ page }: PaginationDto) {
        const [users, total] = await this.prismaService.$transaction([
            this.prismaService.user.findMany({
                ...userArgs,
                skip: (page - 1) * LIMIT,
                take: LIMIT,
                orderBy: { userId: "asc" },
            }),
            this.prismaService.user.count(),
        ]);

        return {
            users: users.map(user => this.userMapper.toResponse(user)),
            meta: {
                page,
                totalPages: Math.ceil(total / LIMIT),
            },
        };
    }

    async getUserById(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                userId,
            },
            ...userArgs,
        });

        if (!user) throw new NotFoundException("User not found");

        return this.userMapper.toResponse(user);
    }

    async getUserProfile(userId: string, currentUserId: string) {
        const user = await this.prismaService.user.findUnique({
            where: {
                userId,
            },
            ...userArgs,
        });

        if (!user) throw new NotFoundException("User not found");

        const follow = await this.prismaService.follow.findUnique({
            where: {
                followerId_followingId: {
                    followerId: currentUserId,
                    followingId: userId,
                },
            },
        });

        return {
            user: this.userMapper.toResponse(user),
            isFollowing: !!follow,
        };
    }

    async getUserFollowers(userId: string) {
        await this.checkIfUserExists(userId);

        const follows = await this.prismaService.follow.findMany({
            where: { followingId: userId },
            include: {
                follower: {
                    ...userArgs,
                },
            },
        });

        return follows.map(f => this.userMapper.toResponse(f.follower));
    }

    async getUserFollowings(userId: string) {
        await this.checkIfUserExists(userId);

        const follows = await this.prismaService.follow.findMany({
            where: { followerId: userId },
            include: {
                following: {
                    ...userArgs,
                },
            },
        });

        return follows.map(f => this.userMapper.toResponse(f.following));
    }

    async updateProfile(updateProfileDto: UpdateProfileDto, userId: string) {
        const updatedUser = await this.prismaService.user.update({
            where: { userId },
            data: {
                ...updateProfileDto,
            },
            ...userArgs,
        });

        return this.userMapper.toResponse(updatedUser);
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

    async updateUserAvatar(userId: string, file: Express.Multer.File) {
        if (!file) throw new BadRequestException("File is required");

        const type = await fileTypeFromBuffer(file.buffer);

        if (!type || !MIME_TYPE.has(type.mime)) {
            throw new BadRequestException("Unsupported file type");
        }

        const user = await this.prismaService.user.findUnique({
            where: { userId },
            select: { avatarKey: true },
        });

        if (!user) throw new NotFoundException("User not found");

        const { fileUrl, fileKey } = await this.s3StorageService.uploadFile(
            {
                ...file,
                mimetype: type.mime,
                originalname: `avatar.${type.ext}`,
            },
            "avatars",
            user.avatarKey,
        );

        await this.prismaService.user.update({
            where: { userId },
            data: { avatarKey: fileKey },
        });

        return { avatarUrl: fileUrl };
    }
    async deleteUserAvatar(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { userId },
            select: { avatarKey: true },
        });

        if (!user) throw new NotFoundException("User not found");
        if (!user?.avatarKey) throw new NotFoundException("User doesn't have avatar");

        await this.prismaService.user.update({
            where: { userId },
            data: {
                avatarKey: null,
            },
        });

        await this.s3StorageService.deleteFile(user.avatarKey);

        return { success: true };
    }

    private async checkIfUserExists(userId: string) {
        const user = await this.prismaService.user.findUnique({
            where: { userId },
            select: { userId: true },
        });

        if (!user) throw new NotFoundException(`User with ${userId} id not found`);
    }
}
