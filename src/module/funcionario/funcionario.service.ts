import { Inject, Injectable } from '@nestjs/common';
import { IDatabaseExeptions } from 'src/module/database/database-execeptions/IDatabaseExceptions';
import { PostgreeService } from 'src/module/database/postgree/postgree.service';
import { HashDataService } from '../hash/hash-data/hash-data.service';
import { User } from '../user/entities/user.entity';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';

@Injectable()
export class FuncionarioService {
  constructor(
    private BD: PostgreeService,
    private hash: HashDataService,
    @Inject('EXCEPTIONS_POSTGREE')
    private exceptions: IDatabaseExeptions,
  ) {}
  async create(createFuncionarioDto: CreateFuncionarioDto) {
    const funcionarioExist = await this.BD.funcionario.findFirst({
      where: {
        matricula: createFuncionarioDto.matricula,
      },
    });

    if (funcionarioExist) {
      throw new Error('Funcionário já cadastrado');
    }

    createFuncionarioDto.senha = await this.hash.hashData(
      createFuncionarioDto.senha,
      10,
    );

    try {
      return await this.BD.funcionario.create({
        data: createFuncionarioDto,
      });
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async findAll() {
    return await this.BD.funcionario.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.BD.funcionario.findUniqueOrThrow({ where: { id: id } });
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async update(currentUser: User, updateFuncionarioDto: UpdateFuncionarioDto) {
    try {
      const updateUser = await this.BD.funcionario.update({
        where: {
          id: currentUser.id,
        },
        data: updateFuncionarioDto,
      });

      return updateUser;
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }

  async remove(id: number) {
    try {
      const userDeleted = await this.BD.funcionario.delete({
        where: { id: id },
      });

      return userDeleted;
    } catch (error) {
      this.exceptions.checkError(error);
    }
  }
}
