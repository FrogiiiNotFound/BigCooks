import { Prisma } from "../../generated/prisma/client";

export const authorArgs = {
    select: {
        userId: true,
        nickname: true,
        name: true,
        avatarKey: true,
    },
} satisfies Prisma.UserDefaultArgs;

export type Author = Prisma.UserGetPayload<typeof authorArgs>;