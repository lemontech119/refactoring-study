export interface IEmployee {
  id: number;
  name: string;
  wage: number;
  role: Role;
  isProbationary: boolean;
  evaluation: Evaluation;
  supporter: boolean;
}

export enum Evaluation {
  good = 'good',
  normal = 'normal',
  bad = 'bad',
}

export enum Role {
  regular = 'regular',
  partTime = 'partTime',
  leader = 'leader',
  boardMember = 'boardMember',
}

export const imagineEmployee: IEmployee[] = [
  {
    id: 1,
    name: 'A',
    wage: 2000000,
    role: Role.regular,
    isProbationary: false,
    evaluation: Evaluation.good,
    supporter: false,
  },
  {
    id: 2,
    name: 'B',
    wage: 2000000,
    role: Role.regular,
    isProbationary: true,
    evaluation: Evaluation.good,
    supporter: true,
  },
  {
    id: 3,
    name: 'C',
    wage: 1800000,
    role: Role.partTime,
    isProbationary: false,
    evaluation: Evaluation.bad,
    supporter: false,
  },
  {
    id: 4,
    name: 'D',
    wage: 4000000,
    role: Role.leader,
    isProbationary: false,
    evaluation: Evaluation.good,
    supporter: true,
  },
  {
    id: 5,
    name: 'E',
    wage: 2000000,
    role: Role.regular,
    isProbationary: false,
    evaluation: Evaluation.bad,
    supporter: false,
  },
  {
    id: 6,
    name: 'F',
    wage: 10000000,
    role: Role.boardMember,
    isProbationary: false,
    evaluation: Evaluation.good,
    supporter: false,
  },
];
