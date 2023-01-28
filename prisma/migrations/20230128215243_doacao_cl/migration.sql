/*
  Warnings:

  - Added the required column `realizada` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Doacao" ADD COLUMN     "realizada" BOOLEAN NOT NULL;
