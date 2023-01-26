import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Funcionario, Prisma } from '@prisma/client';

@Injectable()
export class FuncionarioService {
  constructor(private prisma: PrismaService) {}

  async Funcionario(
    FuncionarioWhereUniqueInput: Prisma.FuncionarioWhereUniqueInput,
  ): Promise<Funcionario | null> {
    return this.prisma.funcionario.findUnique({
      where: FuncionarioWhereUniqueInput,
    });
  }

  async funcionarios(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.FuncionarioWhereUniqueInput;
    where?: Prisma.FuncionarioWhereInput;
    orderBy?: Prisma.FuncionarioOrderByWithRelationInput;
  }): Promise<Funcionario[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.funcionario.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async createFuncionario(data: Prisma.FuncionarioCreateInput): Promise<Funcionario> {
    return this.prisma.funcionario.create({
      data,
    });
  }

  async updateFuncionario(params: {
    where: Prisma.FuncionarioWhereUniqueInput;
    data: Prisma.FuncionarioUpdateInput;
  }): Promise<Funcionario> {
    const { where, data } = params;
    return this.prisma.funcionario.update({
      data,
      where,
    });
  }

  async deleteFuncionario(where: Prisma.FuncionarioWhereUniqueInput): Promise<Funcionario> {
    return this.prisma.funcionario.delete({
      where,
    });
  }
}