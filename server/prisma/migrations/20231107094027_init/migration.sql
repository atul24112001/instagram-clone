/*
  Warnings:

  - You are about to drop the column `createdAt` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `updateAtr` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `profile` table. All the data in the column will be lost.
  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[user_id]` on the table `profile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `user_id` to the `profile` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "_profileTouser" DROP CONSTRAINT "_profileTouser_B_fkey";

-- DropIndex
DROP INDEX "profile_userId_key";

-- AlterTable
ALTER TABLE "profile" DROP COLUMN "createdAt",
DROP COLUMN "profileImage",
DROP COLUMN "updateAtr",
DROP COLUMN "userId",
ADD COLUMN     "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "profile_image" TEXT,
ADD COLUMN     "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "user_id" TEXT NOT NULL;

-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "profile_user_id_key" ON "profile"("user_id");

-- AddForeignKey
ALTER TABLE "_profileTouser" ADD CONSTRAINT "_profileTouser_B_fkey" FOREIGN KEY ("B") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
