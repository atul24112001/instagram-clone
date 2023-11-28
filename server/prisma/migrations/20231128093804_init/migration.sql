/*
  Warnings:

  - A unique constraint covering the columns `[userName]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "userName" TEXT NOT NULL DEFAULT 'atul.morchhlay';

-- CreateIndex
CREATE UNIQUE INDEX "users_userName_key" ON "users"("userName");
