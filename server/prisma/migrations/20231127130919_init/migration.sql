/*
  Warnings:

  - You are about to drop the column `url` on the `asset` table. All the data in the column will be lost.
  - You are about to drop the column `profile_id` on the `posts` table. All the data in the column will be lost.
  - You are about to drop the `profiles` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `user_follwers` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `asset` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `type` on the `asset` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `userId` to the `posts` table without a default value. This is not possible if the table is not empty.
  - Made the column `caption` on table `posts` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_profile_id_fkey";

-- DropForeignKey
ALTER TABLE "profiles" DROP CONSTRAINT "profiles_user_id_fkey";

-- DropForeignKey
ALTER TABLE "user_follwers" DROP CONSTRAINT "user_follwers_profileId_fkey";

-- DropForeignKey
ALTER TABLE "user_follwers" DROP CONSTRAINT "user_follwers_userId_fkey";

-- AlterTable
ALTER TABLE "asset" DROP COLUMN "url",
ADD COLUMN     "userId" TEXT NOT NULL,
DROP COLUMN "type",
ADD COLUMN     "type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "posts" DROP COLUMN "profile_id",
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "caption" SET NOT NULL,
ALTER COLUMN "caption" SET DEFAULT '';

-- DropTable
DROP TABLE "profiles";

-- DropTable
DROP TABLE "user_follwers";

-- CreateTable
CREATE TABLE "user_follows" (
    "id" TEXT NOT NULL,
    "follow" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "user_follows_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "user_follows" ADD CONSTRAINT "user_follows_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "posts" ADD CONSTRAINT "posts_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "asset" ADD CONSTRAINT "asset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
