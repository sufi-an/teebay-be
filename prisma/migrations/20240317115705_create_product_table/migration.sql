-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL DEFAULT 0.00,
    "rent_price" DOUBLE PRECISION DEFAULT 0.00,
    "rent_type" TEXT,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);
