/*
  Warnings:

  - You are about to drop the column `profileLockedInUntill` on the `Report` table. All the data in the column will be lost.
  - You are about to drop the column `profileUpdateCount` on the `Report` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Report" DROP COLUMN "profileLockedInUntill",
DROP COLUMN "profileUpdateCount";

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileLockedInUntill" TIMESTAMP(3),
ADD COLUMN     "profileUpdateCount" INTEGER NOT NULL DEFAULT 0;
