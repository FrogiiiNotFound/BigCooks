import { Body, Controller, Delete, Param, Patch, Post } from "@nestjs/common";
import { CurrentUser } from "../auth/decorators/current-user.decorator";
import { CommentService } from "./comment.service";
import { SetCommentLikeDto } from "./dto/set-comment-like.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";

@Controller("comment")
export class CommentController {
    constructor(private readonly commentService: CommentService) {}

    @Patch(":id")
    async updateComment(
        @Param("id") commentId: string,
        @Body() updateCommentDto: UpdateCommentDto,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.commentService.updateComment(commentId, updateCommentDto, userId);
    }

    @Post(":id/like")
    async like(
        @Param("id") commentId: string,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.commentService.like(commentId, userId);
    }

    @Delete(":id/like")
    async removeLike(
        @Param("id") commentId: string,
        @CurrentUser("userId") userId: string,
    ) {
        return await this.commentService.removeLike(commentId, userId);
    }

    @Delete(":id")
    async deleteComment(@Param("id") commentId: string, @CurrentUser("userId") userId: string) {
        return await this.commentService.deleteComment(commentId, userId);
    }
}
