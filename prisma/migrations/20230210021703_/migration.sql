/*
  Warnings:

  - You are about to drop the column `realizada` on the `Doacao` table. All the data in the column will be lost.
  - Added the required column `status` to the `Doacao` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "status_doacao" AS ENUM ('MARCADA', 'FINALIZADA');

-- AlterTable
ALTER TABLE "Doacao" DROP COLUMN "realizada",
ADD COLUMN     "status" "status_doacao" NOT NULL;
