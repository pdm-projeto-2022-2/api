import { Module } from '@nestjs/common';
import { execptionsPostgreeService } from './postgree/postgree.service';

@Module({
  providers: [execptionsPostgreeService],
  exports: [execptionsPostgreeService],
})
export class DatabaseExeceptionsModule {}
