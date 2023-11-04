import { Component, OnInit } from '@angular/core';
import { TStore, TTable, TReservation, store, tables } from './db';

export class ReservationService {
  private _tables: TTable[] = [];
  private _reservations: TReservation[] = [];

  constructor() {}

  get tables(): TTable[] {
    return this._tables;
  }

  get reservations(): TReservation[] {
    return this._reservations;
  }

  setTables(tables: TTable[]): void {
    this._tables = tables;
  }

  findAvailableTable(peopleCount: number): TTable | undefined {
    return this._tables.find(
      (table) => !table.isUsing && table.maxCapacity >= peopleCount
    );
  }

  addReservation(peopleCount: number, phoneNumber: string): void {
    this._reservations.push({
      id: this._reservations.length + 1,
      peopleCount,
      phoneNumber,
    });
  }

  cancelReservation(reservationId: number): void {
    const index = this._reservations.findIndex(
      (reservation) => reservation.id === reservationId
    );
    if (index !== -1) {
      this._reservations.splice(index, 1);
    }
  }

  openReservation(table: TTable): boolean {
    if (this._reservations.length > 0) {
      const reservation = this._reservations.shift();
      if (reservation) {
        table.isUsing = true;
        return true;
      }
    }
    return false;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public store: TStore = store;
  public tables: TTable[] = tables;
  public peopleCount = 0;
  public phoneNumber = '';
  public maxCapacity = 0;
  public location = '';
  public reservation = new ReservationService();

  constructor() {}

  ngOnInit(): void {
    this.reservation.setTables(tables);
  }

  showAlert(message: string): void {
    alert(message);
  }

  resetTablingView(message: string): void {
    this.peopleCount = 0;
    this.phoneNumber = '';
    this.showAlert(message);
  }

  resetAddTableView(message: string): void {
    this.maxCapacity = 0;
    this.location = '';
    this.showAlert(message);
  }

  doTabling(peopleCount: number, phoneNumber: string): void {
    if (peopleCount <= 0 || phoneNumber === '') {
      this.showAlert('인원수와 전화번호를 입력해주세요.');
      return;
    }

    const table = this.reservation.findAvailableTable(peopleCount);

    if (table) {
      table.isUsing = true;
      this.resetTablingView(`${table.location} 테이블에 앉으세요.`);
      return;
    }
    this.reservation.addReservation(peopleCount, phoneNumber);
    this.resetTablingView('예약이 완료 됐습니다.');
  }

  cancelReservation(reservationId: number): void {
    this.reservation.cancelReservation(reservationId);
  }

  endTable(tableId: number): void {
    const table = this.reservation.tables.find((table) => table.id === tableId);
    if (!table) {
      return;
    }

    table.isUsing = false;
    if (this.reservation.openReservation(table)) {
      this.showAlert(`${table.location} 테이블에 앉으세요.`);
    }
  }

  addTable(storeId: number, maxCapacity: number, location: string): void {
    const newTable: TTable = {
      id: this.reservation.tables.length + 1,
      storeId,
      maxCapacity,
      location,
      isUsing: false,
    };
    const tables = this.reservation.tables;
    tables.push(newTable);
    this.reservation.setTables(tables);

    this.store.tableCount = this.reservation.tables.length;
    this.resetAddTableView(`${location} 테이블이 추가 됐습니다.`);
  }

  removeTable(tableId: number): void {
    const tableList = this.reservation.tables;
    const table = tableList.find((table) => table.id === tableId);
    if (!table) {
      this.showAlert('테이블이 없습니다.');
      return;
    }
    if (table.isUsing) {
      this.showAlert('사용중인 테이블은 삭제할 수 없습니다.');
      return;
    }
    const index = tableList.findIndex((table) => table.id === tableId);
    if (index !== -1) {
      tableList.splice(index, 1);
      this.reservation.setTables(tableList);
      this.showAlert(`${table.location} 테이블이 삭제 됐습니다.`);
    }
  }
}
