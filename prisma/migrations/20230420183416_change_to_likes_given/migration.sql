/*
  Warnings:

  - You are about to drop the column `likesGiven` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "likesGiven",
ADD COLUMN     "likesGiven" INTEGER NOT NULL DEFAULT 0;
