-- DropForeignKey
ALTER TABLE "Recipe" DROP CONSTRAINT "Recipe_cookId_fkey";

-- AddForeignKey
ALTER TABLE "Recipe" ADD CONSTRAINT "Recipe_cookId_fkey" FOREIGN KEY ("cookId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
