import {
    ConflictException,
    ForbiddenException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { commentArgs } from "./args/comment.args";
import { CommentPaginationDto } from "./dto/comment-pagination.dto";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentMapper } from "./mapper/comment.mapper";

@Injectable()
export class CommentService {
    constructor(private readonly prismaService: PrismaService) {}

    async createComment(recipeId: string, createCommentDto: CreateCommentDto, userId: string) {
        const comment = await this.prismaService.comment.create({
            data: {
                content: createCommentDto.content,
                recipeId,
                authorId: userId,
            },
            ...commentArgs(userId),
        });

        return CommentMapper.toResponse(comment);
    }

    async getRecipeComments(
        recipeId: string,
        paginationQuery: CommentPaginationDto,
        userId: string,
    ) {
        const [comments, total] = await this.prismaService.$transaction([
            this.prismaService.comment.findMany({
                where: { recipeId },
                ...commentArgs(userId),
                orderBy: { createdAt: "desc" },
                skip: paginationQuery.offset,
                take: paginationQuery.limit,
            }),
            this.prismaService.comment.count({ where: { recipeId } }),
        ]);

        return {
            comments: CommentMapper.toResponseList(comments),
            total,
        };
    }

    async updateComment(commentId: string, updateCommentDto: UpdateCommentDto, userId: string) {
        const comment = await this.checkIfCommentExists(commentId);

        if (comment.authorId !== userId) {
            throw new ForbiddenException(
                `You don't have permission to delete comment with ${commentId} id`,
            );
        }

        const updatedComment = await this.prismaService.comment.update({
            where: { commentId },
            data: {
                content: updateCommentDto.content,
            },
            ...commentArgs(userId),
        });

        return CommentMapper.toResponse(updatedComment);
    }

    async like(commentId: string, userId: string) {
        await this.checkIfCommentExists(commentId);

        const commentLike = await this.prismaService.commentLike.findUnique({
            where: {
                userId_commentId: { commentId, userId },
            },
        });

        if (commentLike) throw new ConflictException(`Comment with ${commentId} id already liked`);

        const updatedComment = await this.prismaService.comment.update({
            where: { commentId },
            data: {
                likesCount: { increment: 1 },
                commentLike: { create: { userId } },
            },
            ...commentArgs(userId),
        });

        return CommentMapper.toResponse(updatedComment);
    }

    async removeLike(commentId: string, userId: string) {
        await this.checkIfCommentExists(commentId);

        const commentLike = await this.prismaService.commentLike.findUnique({
            where: {
                userId_commentId: { commentId, userId },
            },
        });

        if (!commentLike) throw new ConflictException(`Comment with ${commentId} id not liked`);

        const updatedComment = await this.prismaService.comment.update({
            where: { commentId },
            data: {
                likesCount: { decrement: 1 },
                commentLike: { delete: { userId_commentId: { userId, commentId } } },
            },
            ...commentArgs(userId),
        });

        return CommentMapper.toResponse(updatedComment);
    }

    async deleteComment(commentId: string, userId: string) {
        const comment = await this.checkIfCommentExists(commentId);

        if (comment.authorId !== userId) {
            throw new ForbiddenException(
                `You don't have permission to delete comment with ${commentId} id`,
            );
        }

        const updatedComment = await this.prismaService.comment.update({
            where: { commentId },
            data: {
                deletedAt: new Date(),
            },
            ...commentArgs(userId),
        });

        return CommentMapper.toResponse(updatedComment);
    }

    private async checkIfCommentExists(commentId: string) {
        const comment = await this.prismaService.comment.findUnique({
            where: { commentId },
        });

        if (!comment) throw new NotFoundException(`Comment with ${commentId} id not found`);

        return comment;
    }
}
