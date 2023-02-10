import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseExeptions } from 'src/database/database-execeptions/IDatabaseExceptions';
import { PostgreeService } from 'src/database/postgree/postgree.service';
import { HashDataService } from 'src/hash/hash-data/hash-data.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionarioService {

  constructor(
    private BD :PostgreeService,
    private hash :HashDataService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions :IDatabaseExeptions
  ){}
 async create(createFuncionarioDto: CreateFuncionarioDto) {
  createFuncionarioDto.senha = await this.hash.hashData(createFuncionarioDto.senha,10)
  try {
   return await this.BD.funcionario.create({
      data:createFuncionarioDto
    })
  } catch (error) {
    this.exceptions.checkError(error)
  }
    
  }

async findAll() {
   return await this.BD.funcionario.findMany()
    
  }

 async findOne(id: number) {
   try {
   return await this.BD.funcionario.findUniqueOrThrow({where:{id:id}})
   } catch (error) {
    this.exceptions.checkError(error)
   }
  }

 async update(id: number, updateFuncionarioDto: UpdateFuncionarioDto) {
    try {
      await this.BD.funcionario.update({
        data:updateFuncionarioDto,
        where:{
          id:id
        }
      }
      )
    } catch (error) {
      this.exceptions.checkError(error)
    }
  }
  async remove(id: number) {
    try {
      await this.BD.funcionario.delete({where:{id:id}})
    } catch (error) {
      this.exceptions.checkError(error)
    }
  }
}
