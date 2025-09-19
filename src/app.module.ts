import { Module } from '@nestjs/common';
import { MetroModule } from './metro/metro.module';

@Module({
  imports: [MetroModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
