/*
  Warnings:

  - You are about to drop the column `image_key` on the `Step` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Step" DROP COLUMN "image_key",
ADD COLUMN     "imageKey" TEXT;
