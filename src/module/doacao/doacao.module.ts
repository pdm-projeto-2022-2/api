import { Module } from '@nestjs/common';
import { DoacaoService } from './doacao.service';
import { DoacaoController } from './doacao.controller';
import { DatabaseExeceptionsModule } from 'src/module/database/database-execeptions/database-execeptions.module';
import { DatabaseModule } from 'src/module/database/database.module';

@Module({
  imports: [DatabaseExeceptionsModule,DatabaseModule],
  controllers: [DoacaoController],
  providers: [DoacaoService]
})
export class DoacaoModule {}
