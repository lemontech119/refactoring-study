import { Component } from '@angular/core';
import { TStore, TTable, TReservation, store, tables } from './db';

export class Customers {
  private _peopleCount: number;
  private _phoneNumber: string;

  constructor(peopleCount: number, phoneNumber: string) {
    this._peopleCount = peopleCount;
    this._phoneNumber = phoneNumber;
  }

  get peopleCount() {
    return this._peopleCount;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  set peopleCount(value: number) {
    this._peopleCount = value;
  }

  set phoneNumber(value: string) {
    this._phoneNumber = value;
  }

  execute() {
    this._peopleCount = 0;
    this._phoneNumber = '';
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public store: TStore = store;
  public tables: TTable[] = tables;
  public reservations: TReservation[] = [];
  public maxCapacity = 0;
  public location = '';
  public customers = new Customers(0, '');

  showAlert(message: string): void {
    alert(message);
  }


  doTabling(): void {
    let message = '';
    if (this.customers.peopleCount <= 0 ||this.customers.phoneNumber === '') {
      message = '인원수와 전화번호를 입력해주세요.';
      this.showAlert(message);
      return;
    }

    const table = this.tables.find(
      (table) => table.isUsing === false && table.maxCapacity >= this.customers.peopleCount
    );

    if (table) {
      table.isUsing = true;
      message = `${table.location} 테이블에 앉으세요.`;
    } else {
      this.reservations.push({
        id: this.reservations.length + 1,
        peopleCount:this.customers.peopleCount,
        phoneNumber: this.customers.phoneNumber
      });
      message = '예약이 완료 됐습니다.';
    }
    this.customers.execute();
    this.showAlert(message);
  }

  cancelReservation(reservationId: number): void {
    const index = this.reservations.findIndex(
      (reservation) => reservation.id === reservationId
    );
    if (index !== -1) {
      this.reservations.splice(index, 1);
    }
  }

  endTable(tableId: number): void {
    const table = this.tables.find((table) => table.id === tableId);
    if (!table) {
      return;
    }
    table.isUsing = false;
    if (this.reservations.length <= 0) {
      return;
    }
    const reservation = this.reservations.shift();
    if (reservation) {
      table.isUsing = true;
      this.showAlert(
        `${reservation.phoneNumber}님, ${table.location} 테이블에 앉으세요.`
      );
    }
  }

  addTable(storeId: number, maxCapacity: number, location: string): void {
    this.tables.push({
      id: this.tables.length + 1,
      storeId,
      maxCapacity,
      location,
      isUsing: false
    });

    this.store.tableCount = this.tables.length;
    this.showAlert(`${location} 테이블이 추가 됐습니다.`);
  }

  removeTable(tableId: number): void {
    let message = '';
    const table = this.tables.find((table) => table.id === tableId);
    if (!table) {
      message = '테이블이 없습니다.';
    } else if (table.isUsing) {
      message = '사용중인 테이블은 삭제할 수 없습니다.';
    } else {
      const index = this.tables.findIndex((table) => table.id === tableId);
      if (index !== -1) {
        this.tables.splice(index, 1);
        message = `${table.location} 테이블이 삭제 됐습니다.`;
      }
    }
    this.showAlert(message);
  }
}
