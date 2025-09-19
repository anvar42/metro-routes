import { Module } from '@nestjs/common';
import { MetroService } from './metro.service';
import { MetroController } from './metro.controller';
import { MetroRepository } from './metro.repository';
import { PrismaModule } from 'src/base';

@Module({
  imports: [PrismaModule],
  controllers: [MetroController],
  providers: [MetroService, MetroRepository],
  exports: [MetroService, MetroRepository],
})
export class MetroModule {}
