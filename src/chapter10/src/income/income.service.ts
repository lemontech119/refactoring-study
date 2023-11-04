import { Injectable } from '@nestjs/common';
import { imagineEmployee, Role, Evaluation } from './income.db';

@Injectable()
export class IncomeService {
  // 세금 뗀 금액
  // - 수습의 경우 20%를 제외하고 지급합니다.
  getIncomeNotTax(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (!employee) {
      return;
    }
    return this.isProbationary(employee) ? employee.wage * 0.8 : employee.wage;
  }

  // 세금 포함
  // - 아르바이트는 세금을 떼지 않습니다.
  // - 수습의 경우 20%를 제외하고 지급합니다.
  // - 세금은 임의로 10%로 가정합니다.
  // - 팀장은 많이 벌어서 20%를 뗍니다.
  // - 이사는 더더더 많이 벌어서 30%를 뗍니다.
  getIncome(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (!employee) {
      return;
    }

    if (this.isProbationary(employee)) {
      return employee.wage * 0.8 * 0.9;
    }

    switch (employee.role) {
      case Role.partTime :
        return employee.wage;
      case Role.leader :
        return employee.wage*0.8;
      case Role.boardMember :
        return employee.wage*0.7;
      default:
        return employee.wage*0.9
    }
  }

  // 연봉 협상
  // - 수습의 경우 연봉을 협상할 수 없습니다. (협상 금액은 현재 급여와 같습니다.)
  // - 수습은 평가가 good인 경우 정규직으로 전환됩니다.
  // - 아르바이트는 연봉을 협상할 수 없습니다. (협상 금액은 현재 급여와 같습니다.)
  // - 정규직은 good은 10% 인상, normal은 5% 인상, bad는 0% 인상입니다.
  // - 팀장의 경우 good은 20% 인상, normal은 0% 인상, bad는 -10% 삭감입니다.
  // - 이사는 연봉 협상 대상자가 아닙니다.
  negotiateIncome(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (!employee) {
      return;
    }

    if (this.isProbationary(employee)) {
      return employee.wage;
    }

    if(employee.role===Role.regular || employee.role===Role.leader) {
      return employee.wage * this.getNewIncomeMultiplier(employee.role, employee.evaluation);
    } else {
      return employee.wage;
    }
  }

  // 서포터즈 수당
  // - 서포터즈는 100000원의 수당을 받습니다.
  getSupporterIncome(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (!employee) {
      return;
    }
    return employee.supporter?100000:0;
  }

  // https://www.chosun.com/economy/auto/2023/09/12/IVDBKUONOVGFFLEDPSYKFFHF7M/
  // 파업 합의금
  // - 정규직과 팀장은 연봉의 4배와 1050만원을 합산한 금액을 받습니다.
  // - 아르바이트는 1050만원 금액을 받습니다.
  // - 이사는 파업 합의금을 받지 않습니다.
  getStrikeSettlementMoney(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);
    if (!employee) {
      return;
    }

    switch (employee.role) {
      case Role.boardMember:
        return 0;
      case Role.partTime:
        return 10500000;
      case Role.regular:
      case Role.leader:
        return employee.wage * 4 + 10500000;

    }
  }

  isProbationary(employee) {
    return employee.role === Role.regular && employee.isProbationary;
  }

  getNewIncomeMultiplier(role, grade) {
    if (grade===Evaluation.bad) return role===Role.regular?1:0.9;
    if (grade===Evaluation.normal) return role===Role.regular?1.05:1;
    if (grade===Evaluation.good) return role===Role.regular?1.1:1.2;
  }
}
