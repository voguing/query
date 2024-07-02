/*
  Warnings:

  - Added the required column `name` to the `Sku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sku" ADD COLUMN     "name" TEXT NOT NULL;
