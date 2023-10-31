import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IncomeModule } from './income/income.module';

@Module({
  imports: [IncomeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
