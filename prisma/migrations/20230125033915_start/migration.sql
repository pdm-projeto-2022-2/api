-- CreateTable
CREATE TABLE "Funcionario" (
    "Id" BIGSERIAL NOT NULL,
    "nome" TEXT,
    "matricula" TEXT,
    "isAdmin" BOOLEAN,
    "imagem" TEXT,

    CONSTRAINT "Funcionario_pkey" PRIMARY KEY ("Id")
);
