import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { UsuarioService } from './usuario.service';
import { Doacao, Prisma } from '@prisma/client';

interface createDoacaoProps{
  doadorId: number, 
  data: Date, 
  realizada: boolean
}

@Injectable()
export class DoacaoService {
  constructor(private prisma: PrismaService, private userService: UsuarioService) {}

  async Doacao(
    DoacaoWhereUniqueInput: Prisma.DoacaoWhereUniqueInput,
  ): Promise<Doacao | null> {
    return this.prisma.doacao.findUnique({
      where: DoacaoWhereUniqueInput,
    });
  }

  async doacaos(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.DoacaoWhereUniqueInput;
    where?: Prisma.DoacaoWhereInput;
    orderBy?: Prisma.DoacaoOrderByWithRelationInput;
  }): Promise<Doacao[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.doacao.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }


  async createDoacao({doadorId, data, realizada}:createDoacaoProps): Promise<Doacao> {
    return this.prisma.doacao.create({
      data:{
        data, 
        realizada,
        doador:{
          connect:{id: Number(doadorId)}
        }
      }
    })
  }

  async updateDoacao(params: {
    where: Prisma.DoacaoWhereUniqueInput;
    data: Prisma.DoacaoUpdateInput;
  }): Promise<Doacao> {
    const { where, data } = params;
    return this.prisma.doacao.update({
      data,
      where,
    });
  }

  async deleteDoacao(where: Prisma.DoacaoWhereUniqueInput): Promise<Doacao> {
    return this.prisma.doacao.delete({
      where,
    });
  }
}