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

export type TReservation = {
  id: number;
  peopleCount: number;
  phoneNumber: string;
};

export const store: TStore = {
  id: 1,
  name: '청와옥',
  tableCount: 5,
};

export const tables: TTable[] = [
  {
    id: 1,
    storeId: 1,
    maxCapacity: 4,
    location: '창가 1번',
    isUsing: false,
  },
  {
    id: 2,
    storeId: 1,
    maxCapacity: 4,
    location: '창가 2번',
    isUsing: false,
  },
  {
    id: 3,
    storeId: 1,
    maxCapacity: 2,
    location: '실내 중앙 3번',
    isUsing: false,
  },
  {
    id: 4,
    storeId: 1,
    maxCapacity: 2,
    location: '실내 중앙 4번',
    isUsing: false,
  },
  {
    id: 5,
    storeId: 1,
    maxCapacity: 4,
    location: '개인실 5번',
    isUsing: true,
  },
];
