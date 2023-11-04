export type TStore = {
  id: number;
  name: string;
  tableCount: number;
};

export type TTable = {
  id: number;
  storeId: number;
  maxCapacity: number;
  location: string;
  isUsing: boolean;
};

export type TCustomers = {
  id: number;
  peopleCount: number;
  phoneNumber: string;
};
