export interface IStore {
  id: number;
  name: string;
  tableCount: number;
};

export interface ITable {
  id: number
  storeId: number;
  maxCapacity: number;
  location: string;
  isUsing: boolean;
};

export interface ICustomers {
  id: number;
  peopleCount: number;
  phoneNumber: string;
  status: CustomerStatus;
};

export enum CustomerStatus {
  waiting = 'waiting',
  enter = 'enter',
  exit = 'exit'
}
