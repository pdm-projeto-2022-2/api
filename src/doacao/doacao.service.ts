import { Inject, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { IDatabaseExeptions } from 'src/database/database-execeptions/IDatabaseExceptions';

import { PostgreeService } from 'src/database/postgree/postgree.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Injectable()
export class DoacaoService {
  constructor(
    private BD :PostgreeService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions :IDatabaseExeptions
  ){}
 async create(createDoacaoDto: CreateDoacaoDto) {
  const DataTime = new Date(createDoacaoDto.data)
try {
  await this.BD.doacao.create({
    data:{
      doadorId:createDoacaoDto.doadorId,
      status: createDoacaoDto.status,
      data: DataTime
    }
  })
} catch (error) {
  this.exceptions.checkError(error)
}
  }

 async findAll() {
    await this.BD.doacao.findMany()
  }
 async findOne(id: number) {
    try {
      await this.BD.doacao.findUniqueOrThrow({where:{id:id}})
    } catch (error) {
      this.exceptions.checkError(error)
    }
  }
 async update(id: number, updateDoacaoDto: UpdateDoacaoDto) {
    try {
      await this.BD.doacao.update({
        data:updateDoacaoDto,
        where:{id:id}
      })
    } catch (error) {
      this.exceptions.checkError(error)
    }
  }
 async remove(id: number) {
    try {
      await this.BD.doacao.delete({where:{id:id}})
    } catch (error) {
      this.exceptions.checkError(error)
    }
  }
}
