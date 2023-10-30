import { Injectable } from '@nestjs/common';
import { imagineEmployee, Role, Evaluation } from './income.db';

@Injectable()
export class IncomeService {
  // 세금 뗀 금액
  // - 수습의 경우 20%를 제외하고 지급합니다.
  getIncomeNotTax(id: number): number {
    let income = 0;
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (employee) {
      if (employee.role === Role.regular) {
        if (employee.isProbationary) {
          income = employee.wage * 0.8;
        } else {
          income = employee.wage;
        }
      } else {
        income = employee.wage;
      }
    }
    return income;
  }

  // 세금 포함
  // - 아르바이트는 세금을 떼지 않습니다.
  // - 수습의 경우 20%를 제외하고 지급합니다.
  // - 세금은 임의로 10%로 가정합니다.
  // - 팀장은 많이 벌어서 20%를 뗍니다.
  // - 이사는 더더더 많이 벌어서 30%를 뗍니다.
  getIncome(id: number): number {
    let income = 0;
    const employee = imagineEmployee.find((employee) => employee.id === id);

    if (employee) {
      if (employee.role === Role.partTime) {
        income = employee.wage;
      } else if (employee.role === Role.regular) {
        if (employee.isProbationary) {
          income = employee.wage * 0.8 * 0.9;
        } else {
          income = employee.wage * 0.9;
        }
      } else if (employee.role === Role.leader) {
        income = employee.wage * 0.8;
      } else if (employee.role === Role.boardMember) {
        income = employee.wage * 0.7;
      }
    }

    return income;
  }

  // 연봉 협상
  // - 수습의 경우 연봉을 협상할 수 없습니다. (협상 금액은 현재 급여와 같습니다.)
  // - 수습은 평가가 good인 경우 정규직으로 전환됩니다.
  // - 아르바이트는 연봉을 협상할 수 없습니다. (협상 금액은 현재 급여와 같습니다.)
  // - 정규직은 good은 10% 인상, normal은 5% 인상, bad는 0% 인상입니다.
  // - 팀장의 경우 good은 20% 인상, normal은 0% 인상, bad는 -10% 삭감입니다.
  // - 이사는 연봉 협상 대상자가 아닙니다.
  negotiateIncome(id: number): number {
    let newIncome = 0;
    const employee = imagineEmployee.find((employee) => employee.id === id);

    switch (employee.role) {
      case Role.regular:
        if (employee.isProbationary) {
          if (employee.evaluation === Evaluation.good) {
            employee.isProbationary = true;
          }
          newIncome = employee.wage;
        } else {
          if (employee.evaluation === Evaluation.good) {
            newIncome = employee.wage * 1.1;
          } else if (employee.evaluation === Evaluation.normal) {
            newIncome = employee.wage * 1.05;
          } else if (employee.evaluation === Evaluation.bad) {
            newIncome = employee.wage;
          }
        }
        break;

      case Role.leader:
        if (employee.evaluation === Evaluation.good) {
          newIncome = employee.wage * 1.2;
        } else if (employee.evaluation === Evaluation.normal) {
          newIncome = employee.wage;
        } else if (employee.evaluation === Evaluation.bad) {
          newIncome = employee.wage * 0.9;
        }
        break;

      case Role.partTime:
        newIncome = employee.wage;
        break;

      case Role.boardMember:
        newIncome = employee.wage;
        break;
    }

    return newIncome;
  }

  // 서포터즈 수당
  // - 서포터즈는 100000원의 수당을 받습니다.
  getSupporterIncome(id: number): number {
    let income = 0;
    const employee = imagineEmployee.find((employee) => employee.id === id);

    if (employee) {
      if (employee.supporter) {
        income = 100000;
      } else {
        income = 0;
      }
    }

    return income;
  }

  // https://www.chosun.com/economy/auto/2023/09/12/IVDBKUONOVGFFLEDPSYKFFHF7M/
  // 파업 합의금
  // - 정규직과 팀장은 연봉의 4배와 1050만원을 합산한 금액을 받습니다.
  // - 아르바이트는 1050만원 금액을 받습니다.
  // - 이사는 파업 합의금을 받지 않습니다.
  getStrikeSettlementMoney(id: number): number {
    let money = 0;
    const employee = imagineEmployee.find((employee) => employee.id === id);

    if (employee.role === Role.boardMember) {
      money = 0;
    } else if (employee.role === Role.partTime) {
      money = 10500000;
    } else if (employee.role === Role.regular) {
      money = employee.wage * 4 + 10500000;
    } else if (employee.role === Role.leader) {
      money = employee.wage * 4 + 10500000;
    }

    return money;
  }
}
