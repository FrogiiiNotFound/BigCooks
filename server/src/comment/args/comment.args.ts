import { Prisma } from "../../generated/prisma/client";

export const commentArgs = (userId: string) =>
    ({
        include: {
            author: true,
            commentLike: {
                where: { userId },
            },
        },
    }) satisfies Prisma.CommentDefaultArgs;

export type CommentWithRelations = Prisma.CommentGetPayload<ReturnType<typeof commentArgs>>;
