/*
  Warnings:

  - The primary key for the `UpdatesOnDish` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "UpdatesOnDish" DROP CONSTRAINT "UpdatesOnDish_pkey",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "UpdatesOnDish_pkey" PRIMARY KEY ("id");
