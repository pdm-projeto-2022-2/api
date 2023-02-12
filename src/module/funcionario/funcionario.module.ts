import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { DatabaseModule } from 'src/module/database/database.module';
import { DatabaseExeceptionsModule } from 'src/module/database/database-execeptions/database-execeptions.module';
import { HashModule } from '../hash/hash.module';

@Module({
  imports: [DatabaseModule, HashModule, DatabaseExeceptionsModule],
  controllers: [FuncionarioController],
  providers: [FuncionarioService],
})
export class FuncionarioModule {}
