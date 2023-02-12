import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { IsAdmin } from '../auth/decorators/is-admin.decorator';
import { User } from '../user/entities/user.entity';
import { DoacaoService } from './doacao.service';
import { CreateDoacaoDto } from './dto/create-doacao.dto';
import { UpdateDoacaoDto } from './dto/update-doacao.dto';

@Controller('doacao')
export class DoacaoController {
  constructor(private readonly doacaoService: DoacaoService) {}

  @Post()
  create(
    @Body() createDoacaoDto: CreateDoacaoDto,
    @CurrentUser() currentUser: User,
  ) {
    return this.doacaoService.create(createDoacaoDto, currentUser);
  }

  @Get()
  findAll() {
    return this.doacaoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.doacaoService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() updateDoacaoDto: UpdateDoacaoDto) {
    return this.doacaoService.update(id, updateDoacaoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.doacaoService.remove(id);
  }
}
