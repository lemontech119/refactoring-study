import { Table } from './table';
import { TStore } from './type';
import { Customer } from './customer';
import { CustomerStatus } from './interface';

export class Store {
  private _id:number;
  private _name:string;
  private _tableCount:number;
  private _tables: Table[];
  private _reservations: Customer[];

  constructor(data:TStore) {
    this._id = data.id;
    this._name = data.name;
    this._tableCount = 0;
    this._tables = [];
    this._reservations = [];
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get tableCount() {
    return this._tableCount;
  }

  get reservation() {
    return this._reservations;
  }

  get tables() {
    return this._tables;
  }

  set tables(tables:Table[]) {
    this._tables = tables;
  }

  addTable(table:Table) {
    this._tables.push(table)
    this._tableCount += 1;
  }

  removeTable(tableId:number) {
    let message = '';
    const table = this.tables.find((table) => table.id === tableId);
    if (table) {
      if (table.isUsing) {
        message = '사용중인 테이블은 삭제할 수 없습니다.';
        alert(message);
        return;
      }
      const index = this.tables.findIndex((table) => table.id === tableId);
      if (index !== -1) {
        this.tables.splice(index, 1);
        message = `${table.location} 테이블이 삭제 됐습니다.`;
        alert(message);
      }
    } else {
      let message = '테이블이 없습니다.';
      alert(message);
    }
    this._tableCount -= 1;
  }

  addCustomer(customer:Customer) {
    let message = '';
    if (customer.peopleCount <= 0 || customer.phoneNumber === '') {
      message = '올바른 인원 수와 전화번호를 입력해주세요.';
      alert(message);
      return;
    }

    const table = this.tables.find(
      (table) => table.isUsing === false && table.maxCapacity >= customer.peopleCount
    );

    if (table) {
      customer.status = CustomerStatus.enter;
      table.customer = customer;
      table.isUsing = true;
      message = `${table.location} 테이블에 앉으세요.`;
      alert(message);
    } else {
      customer.status = CustomerStatus.waiting;
      this._reservations.push(customer);
      message = '예약이 완료됐습니다.';
      alert(message);
    }
  }

  endTable(tableId:number) {
    const table = this.tables.find((table) => table.id === tableId);

    if (table) {
      table.isUsing = false;
      // table.customer?.status = CustomerStatus.exit;
      if (this.reservation.length > 0) {
        const customer = this.reservation.shift();
        if (customer) {
          table.isUsing = true;
          table.customer = customer;
          table.customer.status = CustomerStatus.enter;
          alert(
            `${customer.phoneNumber}님, ${table.location} 테이블에 앉으세요.`
          );
        }
      }
    }
  }

  removeReservation(customerId:number) {
    const index = this.reservation.findIndex(
      (customer) => customer.id === customerId
    );
    if (index !== -1) {
      this._reservations.splice(index, 1);
    }
  }
}
