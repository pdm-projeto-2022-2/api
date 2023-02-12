import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { CreateFuncionarioDto } from './dto/create-funcionario.dto';
import { UpdateFuncionarioDto } from './dto/update-funcionario.dto';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';
import { IsPublic } from '../auth/decorators/is-public.decorator';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../user/entities/user.entity';

@Controller('funcionario')
export class FuncionarioController {
  constructor(private readonly funcionarioService: FuncionarioService) {}

  @IsPublic()
  @Post()
  create(@Body() createFuncionarioDto: CreateFuncionarioDto) {
    return this.funcionarioService.create(createFuncionarioDto);
  }

  @IsAdmin()
  @Get()
  findAll() {
    return this.funcionarioService.findAll();
  }

  @IsAdmin()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.funcionarioService.findOne(+id);
  }

  @IsAdmin()
  @Patch()
  update(
    @CurrentUser() currentUser: User,
    @Body() updateFuncionarioDto: UpdateFuncionarioDto,
  ) {
    return this.funcionarioService.update(currentUser, updateFuncionarioDto);
  }

  @IsAdmin()
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.funcionarioService.remove(id);
  }
}
