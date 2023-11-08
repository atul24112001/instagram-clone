-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isLogin" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "token" TEXT;
