-- DropForeignKey
ALTER TABLE "Dish" DROP CONSTRAINT "Dish_regionId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_ingredientId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "IngredientsandRecipes" DROP CONSTRAINT "IngredientsandRecipes_unitId_fkey";

-- DropForeignKey
ALTER TABLE "LikesOnRecipes" DROP CONSTRAINT "LikesOnRecipes_recipeId_fkey";

-- DropForeignKey
ALTER TABLE "LikesOnRecipes" DROP CONSTRAINT "LikesOnRecipes_userId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_countryId_fkey";

-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_typeId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "Country"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "Type"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Dish" ADD CONSTRAINT "Dish_regionId_fkey" FOREIGN KEY ("regionId") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsandRecipes" ADD CONSTRAINT "IngredientsandRecipes_ingredientId_fkey" FOREIGN KEY ("ingredientId") REFERENCES "Ingredient"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsandRecipes" ADD CONSTRAINT "IngredientsandRecipes_unitId_fkey" FOREIGN KEY ("unitId") REFERENCES "Unit"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IngredientsandRecipes" ADD CONSTRAINT "IngredientsandRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnRecipes" ADD CONSTRAINT "LikesOnRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LikesOnRecipes" ADD CONSTRAINT "LikesOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
