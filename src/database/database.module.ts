import { Module } from '@nestjs/common';
import { PostgreeService } from './postgree/postgree.service';

@Module({
  providers: [PostgreeService],
  exports: [PostgreeService]
})
export class DatabaseModule {}
