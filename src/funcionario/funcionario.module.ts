import { Module } from '@nestjs/common';
import { FuncionarioService } from './funcionario.service';
import { FuncionarioController } from './funcionario.controller';
import { DatabaseModule } from 'src/database/database.module';
import { HashModule } from 'src/hash/hash.module';
import { DatabaseExeceptionsModule } from 'src/database/database-execeptions/database-execeptions.module';


@Module({
  imports: [DatabaseModule,HashModule,DatabaseExeceptionsModule],
  controllers: [FuncionarioController],
  providers: [FuncionarioService]
})
export class FuncionarioModule {}
