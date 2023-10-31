import { Controller, Get, Param, Post } from '@nestjs/common';
import { IncomeService } from './income.service';

@Controller('income')
export class IncomeController {
  constructor(private readonly incomeService: IncomeService) {}

  @Get(':id/not-tax')
  getIncomeNotTax(@Param() params: any): number {
    return this.incomeService.getIncomeNotTax(Number(params.id));
  }

  @Get(':id')
  getIncome(@Param() params: any): number {
    return this.incomeService.getIncome(Number(params.id));
  }

  @Get(':/id/supporter')
  getSupporter(@Param() params: any): number {
    return this.incomeService.getSupporterIncome(Number(params.id));
  }

  @Get(':id/strike/settlement')
  getStrikeSettlement(@Param() params: any): number {
    return this.incomeService.getStrikeSettlementMoney(Number(params.id));
  }

  @Post(':id/negotiate')
  negotiateIncome(@Param() params: any): number {
    return this.incomeService.negotiateIncome(Number(params.id));
  }
}
