import { CommentWithRelations } from "../args/comment.args";

export class CommentMapper {
    static toResponse(comment: CommentWithRelations) {
        return {
            commentId: comment.commentId,
            content: comment.deletedAt ? null : comment.content,
            likesCount: comment.likesCount,
            isLiked: (comment.commentLike?.length ?? 0) > 0,
            isDeleted: comment.deletedAt !== null,
            createdAt: comment.createdAt,
            author: comment.deletedAt ? null : comment.author,
        };
    }

    static toResponseList(comments: CommentWithRelations[]) {
        return comments.map(comment => this.toResponse(comment));
    }
}
