-- CreateTable
CREATE TABLE "Cart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "mealId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Cart_userId_idx" ON "Cart"("userId");

-- CreateIndex
CREATE INDEX "Cart_mealId_idx" ON "Cart"("mealId");

-- CreateIndex
CREATE UNIQUE INDEX "Cart_userId_mealId_key" ON "Cart"("userId", "mealId");

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_mealId_fkey" FOREIGN KEY ("mealId") REFERENCES "Meals"("id") ON DELETE CASCADE ON UPDATE CASCADE;
