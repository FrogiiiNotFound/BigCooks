import { Prisma } from "../../generated/prisma/client";
import { authorArgs } from "../../user/args/author.args";

export const recipeArgs = () =>
    ({
        include: {
            user: authorArgs,
            ingredients: true,
            tags: { include: { tag: true } },
            steps: true,
        },
    }) satisfies Prisma.RecipeDefaultArgs;

export type RecipeWithRelations = Prisma.RecipeGetPayload<ReturnType<typeof recipeArgs>>;
