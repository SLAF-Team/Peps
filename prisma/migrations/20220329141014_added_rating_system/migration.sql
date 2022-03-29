-- CreateTable
CREATE TABLE "RatingsOnRecipes" (
    "userId" INTEGER NOT NULL,
    "recipeId" INTEGER NOT NULL,
    "rating" INTEGER NOT NULL,

    CONSTRAINT "RatingsOnRecipes_pkey" PRIMARY KEY ("userId","recipeId")
);

-- AddForeignKey
ALTER TABLE "RatingsOnRecipes" ADD CONSTRAINT "RatingsOnRecipes_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RatingsOnRecipes" ADD CONSTRAINT "RatingsOnRecipes_recipeId_fkey" FOREIGN KEY ("recipeId") REFERENCES "Recipe"("id") ON DELETE CASCADE ON UPDATE CASCADE;
