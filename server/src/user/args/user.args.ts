import { Prisma } from "../../generated/prisma/client";

export const userArgs = {
    select: {
        userId: true,
        nickname: true,
        name: true,
        bio: true,
        avatarKey: true,
        createdAt: true,
        _count: {
            select: { recipes: true, followers: true, followings: true },
        },
    },
} satisfies Prisma.UserDefaultArgs;

export type UserWithRelations = Prisma.UserGetPayload<typeof userArgs>;
