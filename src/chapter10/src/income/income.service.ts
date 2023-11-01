import { Injectable } from '@nestjs/common';
import { imagineEmployee, Role, Evaluation, IEmployee } from './income.db';

class Employee {
  public id: number;
  public name: string;
  public wage: number;
  public role: Role;
  public isProbationary: boolean;
  public evaluation: Evaluation;
  public supporter: boolean;

  constructor(public employee: IEmployee) {
    this.id = employee.id;
    this.name = employee.name;
    this.wage = employee.wage;
    this.role = employee.role;
    this.isProbationary = employee.isProbationary;
    this.evaluation = employee.evaluation;
    this.supporter = employee.supporter;
  }

  getIncomeNotTax(): number {
    return this.wage;
  }

  getSupporterIncome(): number {
    return this.supporter ? 100000 : 0;
  }

  negotiateIncome(): number {
    return this.wage;
  }
}

class Regular extends Employee {
  getIncomeNotTax(): number {
    if (this.isProbationary) {
      return this.wage * 0.8;
    }
    return this.wage;
  }

  getIncome(): number {
    if (this.isProbationary) {
      return this.wage * 0.8 * 0.9;
    }
    return this.wage * 0.9;
  }

  negotiateIncome(): number {
    if (this.isProbationary) {
      if (this.evaluation === Evaluation.good) {
        this.isProbationary = true;
      }
      return this.wage;
    } else {
      if (this.evaluation === Evaluation.good) {
        return this.wage * 1.1;
      } else if (this.evaluation === Evaluation.normal) {
        return this.wage * 1.05;
      } else if (this.evaluation === Evaluation.bad) {
        return this.wage;
      }
    }
  }

  getStrikeSettlementMoney(): number {
    return this.wage * 4 + 10500000;
  }
}

class PartTime extends Employee {
  getIncome(): number {
    return this.wage;
  }

  getStrikeSettlementMoney(): number {
    return 10500000;
  }
}

class Leader extends Employee {
  getIncome(): number {
    return this.wage * 0.8;
  }

  negotiateIncome(): number {
    if (this.evaluation === Evaluation.good) {
      return this.wage * 1.2;
    } else if (this.evaluation === Evaluation.normal) {
      return this.wage;
    } else if (this.evaluation === Evaluation.bad) {
      return this.wage * 0.9;
    }
  }

  getStrikeSettlementMoney(): number {
    return this.wage * 4 + 10500000;
  }
}

class BoardMember extends Employee {
  getIncome(): number {
    return this.wage * 0.7;
  }

  getStrikeSettlementMoney(): number {
    return 0;
  }
}

@Injectable()
export class IncomeService {
  // 세금 뗀 금액
  // - 수습의 경우 20%를 제외하고 지급합니다.
  getIncomeNotTax(id: number): number {
    const employee: IEmployee = imagineEmployee.find(
      (employee) => employee.id === id,
    );
    if (!employee) {
      return 0;
    }
    if (employee.role === Role.regular) {
      return new Regular(employee).getIncomeNotTax();
    }
    return new Employee(employee).getIncomeNotTax();
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
      return 0;
    }
    switch (employee.role) {
      case Role.regular:
        return new Regular(employee).getIncome();
      case Role.partTime:
        return new PartTime(employee).getIncome();
      case Role.leader:
        return new Leader(employee).getIncome();
      case Role.boardMember:
        return new BoardMember(employee).getIncome();
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

    switch (employee.role) {
      case Role.regular:
        return new Regular(employee).negotiateIncome();
      case Role.leader:
        return new Leader(employee).negotiateIncome();
      case Role.partTime:
        return new PartTime(employee).negotiateIncome();
      case Role.boardMember:
        return new BoardMember(employee).negotiateIncome();
    }
  }

  // 서포터즈 수당
  // - 서포터즈는 100000원의 수당을 받습니다.
  getSupporterIncome(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);

    if (!employee) {
      return 0;
    }

    return new Employee(employee).getSupporterIncome();
  }

  // https://www.chosun.com/economy/auto/2023/09/12/IVDBKUONOVGFFLEDPSYKFFHF7M/
  // 파업 합의금
  // - 정규직과 팀장은 연봉의 4배와 1050만원을 합산한 금액을 받습니다.
  // - 아르바이트는 1050만원 금액을 받습니다.
  // - 이사는 파업 합의금을 받지 않습니다.
  getStrikeSettlementMoney(id: number): number {
    const employee = imagineEmployee.find((employee) => employee.id === id);

    if (!employee) {
      return 0;
    }

    switch (employee.role) {
      case Role.regular:
        return new Regular(employee).getStrikeSettlementMoney();
      case Role.leader:
        return new Leader(employee).getStrikeSettlementMoney();
      case Role.partTime:
        return new PartTime(employee).getStrikeSettlementMoney();
      case Role.boardMember:
        return new BoardMember(employee).getStrikeSettlementMoney();
    }
  }
}
