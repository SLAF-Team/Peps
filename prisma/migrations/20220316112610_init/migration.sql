/*
  Warnings:

  - You are about to drop the column `possibleUnits` on the `Ingredient` table. All the data in the column will be lost.
  - The primary key for the `IngredientsandRecipes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `unitId` to the `IngredientsandRecipes` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Ingredient" DROP COLUMN "possibleUnits";

-- AlterTable
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_pkey",
ADD COLUMN     "unitId" INTEGER NOT NULL,
ADD CONSTRAINT "IngredientsandRecipes_pkey" PRIMARY KEY ("recipeId", "ingredientId", "unitId");

-- CreateTable
CREATE TABLE "Unit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Unit_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "IngredientsandRecipes" ADD CONSTRAINT "IngredientsandRecipes_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
