/*
  Warnings:

  - Added the required column `localizacao` to the `Usuario` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `tipoSangue` on the `Usuario` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "tipo_sanguineo" AS ENUM ('A_POSITIVO', 'A_NEGATIVO', 'B_POSITIVO', 'B_NEGATIVO', 'AB_POSITIVO', 'AB_NEGATIVO', 'O_POSITIVO', 'O_NEGATIVO');

-- AlterTable
ALTER TABLE "Usuario" ADD COLUMN     "localizacao" TEXT NOT NULL,
DROP COLUMN "tipoSangue",
ADD COLUMN     "tipoSangue" "tipo_sanguineo" NOT NULL;
