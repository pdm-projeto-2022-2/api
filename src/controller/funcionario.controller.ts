import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { FuncionarioService } from '../sevice/funcionario.service'
import { Funcionario as FuncionarioModel} from '@prisma/client';

@Controller()
export class FuncionarioController {
  constructor(
    private readonly funcionarioService: FuncionarioService
    ) {}
    
    @Get('funcionarios')
    async getFuncionarios(@Param('id') id: string): Promise<FuncionarioModel[]> {
      return this.funcionarioService.funcionarios({})
    }
    
    @Get('funcionarios/:id')
    async getFuncionarioById(@Param('id') id: string): Promise<FuncionarioModel> {
      return this.funcionarioService.funcionarios({where:{id: Number(id)}}) as any //FIXME
    }
    
    
    @Post('funcionarios')
    async createFuncionario(
      @Body() postData: { nome: string; matricula: string; senha: string; isAdmin: boolean; imagem: string },
      ): Promise<FuncionarioModel> {
        const { nome, matricula, senha, isAdmin, imagem} = postData;
        return this.funcionarioService.createFuncionario({ nome, matricula, senha, isAdmin, imagem});
      }
      
      @Put('funcionarios/:id')
      async updateFuncionario(@Param('id') id: string, @Body() postData: { nome: string; matricula: string; senha: string; isAdmin: boolean; imagem: string }): Promise<FuncionarioModel> {
        const { nome, matricula, senha, isAdmin, imagem} = postData
        return this.funcionarioService.updateFuncionario({where:{id: Number(id)}, data:{ nome, matricula, senha, isAdmin, imagem}});
      }
      
      @Delete('funcionarios/:id')
      async deleteFuncionario(@Param('id') id: string): Promise<FuncionarioModel> {
        return this.funcionarioService.deleteFuncionario({ id: Number(id) });
      }
    }