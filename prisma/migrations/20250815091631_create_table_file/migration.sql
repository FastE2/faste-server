/*
  Warnings:

  - You are about to alter the column `token` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(1000)`.

*/
-- CreateEnum
CREATE TYPE "public"."FileType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "public"."RefreshToken" ALTER COLUMN "token" SET DATA TYPE VARCHAR(1000);

-- CreateTable
CREATE TABLE "public"."File" (
    "key" VARCHAR(1000) NOT NULL,
    "type" "public"."FileType" NOT NULL DEFAULT 'IMAGE',
    "size" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdById" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "File_key_key" ON "public"."File"("key");

-- AddForeignKey
ALTER TABLE "public"."File" ADD CONSTRAINT "File_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
