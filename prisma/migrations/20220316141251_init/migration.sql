/*
  Warnings:

  - The primary key for the `IngredientsandRecipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `unitId` on the `IngredientsandRecipes` table. All the data in the column will be lost.
  - You are about to drop the `Unit` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `possibleUnits` to the `Ingredient` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_unitId_fkey";

-- AlterTable
ALTER TABLE "Ingredient" ADD COLUMN     "possibleUnits" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_pkey",
DROP COLUMN "unitId",
ADD CONSTRAINT "IngredientsandRecipes_pkey" PRIMARY KEY ("recipeId", "ingredientId");

-- DropTable
DROP TABLE "Unit";
