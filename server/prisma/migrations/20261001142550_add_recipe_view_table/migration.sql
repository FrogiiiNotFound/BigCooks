-- CreateTable
CREATE TABLE "RecipeView" (
    "recipeId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RecipeView_pkey" PRIMARY KEY ("recipeId","userId")
);

-- AddForeignKey
ALTER TABLE "RecipeView" ADD CONSTRAINT "RecipeView_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("recipeId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RecipeView" ADD CONSTRAINT "RecipeView_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
