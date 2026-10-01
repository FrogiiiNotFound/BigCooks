/*
  Warnings:

  - You are about to drop the column `image_key` on the `Recipe` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Recipe" DROP COLUMN "image_key",
ADD COLUMN     "imageKey" TEXT;
