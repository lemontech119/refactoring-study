import { Test, TestingModule } from '@nestjs/testing';
import { IncomeController } from './income.controller';
import { IncomeService } from './income.service';

describe('IncomeController', () => {
  let controller: IncomeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IncomeController],
      providers: [IncomeService],
    }).compile();

    controller = module.get<IncomeController>(IncomeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('세금 포함 금여', () => {
    it('id가 1인 정규직의 세금이 포함된 급여는 200만원이다', () => {
      expect(controller.getIncomeNotTax({ id: 1 })).toBe(2000000);
    });

    it('id가 2인 정규직이며 수습인 세금이 포함된 급여는 200만원이다', () => {
      expect(controller.getIncomeNotTax({ id: 2 })).toBe(1600000);
    });

    it('id가 3인 아르바이트의 급여는 180만원이다.', () => {
      expect(controller.getIncomeNotTax({ id: 3 })).toBe(1800000);
    });
  });

  describe('세금 뗀 금여', () => {
    it('id가 1인 정규직의 세금을 뗀 급여는 180만원이다', () => {
      expect(controller.getIncome({ id: 1 })).toBe(1800000);
    });

    it('id가 2인 정규직이며 수습인 세금을 뗀 급여는 144만원이다', () => {
      expect(controller.getIncome({ id: 2 })).toBe(1440000);
    });

    it('id가 3인 아르바이트의 급여는 180만원이다.', () => {
      expect(controller.getIncome({ id: 3 })).toBe(1800000);
    });

    it('id가 4인 팀장의 급여는 160만원이다.', () => {
      expect(controller.getIncome({ id: 4 })).toBe(3200000);
    });
  });

  describe('지원금', () => {
    it('id가 1인 정규직의 지원금은 0원이다', () => {
      expect(controller.getSupporter({ id: 1 })).toBe(0);
    });
    it('id가 2인 정규직의 지원금은 100000원이다', () => {
      expect(controller.getSupporter({ id: 2 })).toBe(100000);
    });
  });

  describe('급여 협상', () => {
    it('id가 1인 정규직의 급여 협상은 220만원이다', () => {
      expect(controller.negotiateIncome({ id: 1 })).toBe(2200000);
    });

    it('id가 2인 정규직이며 수습인 급여 협상은 200만원이다', () => {
      expect(controller.negotiateIncome({ id: 2 })).toBe(2000000);
    });

    it('id가 3인 아르바이트의 급여 협상은 180만원이다.', () => {
      expect(controller.negotiateIncome({ id: 3 })).toBe(1800000);
    });

    it('id가 4인 팀장의 급여 협상은 480만원이다.', () => {
      expect(controller.negotiateIncome({ id: 4 })).toBe(4800000);
    });

    it('id가 5인 정규직의 급여 협상은 200만원이다.', () => {
      expect(controller.negotiateIncome({ id: 5 })).toBe(2000000);
    });
  });

  describe('파업 합의금', () => {
    it('id가 1인 정규직의 파업 합의금은 18500000원이다', () => {
      expect(controller.getStrikeSettlement({ id: 1 })).toBe(18500000);
    });

    it('id가 3인 아르바이트의 파업 합의금은 10500000원이다.', () => {
      expect(controller.getStrikeSettlement({ id: 3 })).toBe(10500000);
    });

    it('id가 6인 이사의 파업 합의금은 0원이다.', () => {
      expect(controller.getStrikeSettlement({ id: 6 })).toBe(0);
    });
  });
});
