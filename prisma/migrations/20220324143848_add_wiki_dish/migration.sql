-- CreateTable
CREATE TABLE "UpdatesOnDish" (
    "userId" INTEGER NOT NULL,
    "dishId" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "UpdatesOnDish_pkey" PRIMARY KEY ("dishId","userId")
);

-- AddForeignKey
ALTER TABLE "UpdatesOnDish" ADD CONSTRAINT "UpdatesOnDish_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UpdatesOnDish" ADD CONSTRAINT "UpdatesOnDish_dishId_fkey" FOREIGN KEY ("dishId") REFERENCES "Dish"("id") ON DELETE CASCADE ON UPDATE CASCADE;
