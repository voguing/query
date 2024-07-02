/*
  Warnings:

  - Added the required column `hc` to the `Sku` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Sku" ADD COLUMN     "hc" INTEGER NOT NULL;
