import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IDatabaseExeptions } from 'src/module/database/database-execeptions/IDatabaseExceptions';

import { PostgreeService } from 'src/module/database/postgree/postgree.service';
import { User } from '../user/entities/user.entity';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Injectable()
export class DoacaoService {
  constructor(
    private BD: PostgreeService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions: IDatabaseExeptions,
  ) {}

  async create(createDoacaoDto: CreateDoacaoDto, currentUser: User) {
    const DataTime = new Date(createDoacaoDto.data);
    try {
      const doaceoCreated = await this.BD.doacao.create({
        data: {
          doadorId: currentUser.id,
          status: createDoacaoDto.status,
          data: DataTime,
        },
      });

      return doaceoCreated;
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async findAll() {
    return await this.BD.doacao.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.BD.doacao.findUniqueOrThrow({ where: { id: id } });
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async update(id: number, updateDoacaoDto: UpdateDoacaoDto) {
    try {
      return await this.BD.doacao.update({
        where: { id: id },
        data: updateDoacaoDto,
      });
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async remove(id: number) {
    try {
      return await this.BD.doacao.delete({ where: { id: id } });
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }
}
