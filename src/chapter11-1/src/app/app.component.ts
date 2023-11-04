import { Component, OnInit } from '@angular/core';
import { CustomerStatus, ICustomers } from './interface';
import { Store } from './store';
import { Table } from './table';
import { storeData } from './storeDB';
import { tableData } from './tableDB';
import { Customer } from './customer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent implements OnInit{
  public store: Store;
  public tables: Table[]=[];
  public reservations: ICustomers[] = [];
  public totalCustomerCount = 0;
  public registerInfo = { peopleCount: 0, phoneNumber:''};
  public tableInfo = { maxCapacity: 0, location:''};

  constructor() {
    this.store = new Store(storeData);
  }

  ngOnInit() {
    tableData.forEach((table)=>{
      this.store.addTable(new Table(table))
    });
  }

  doTabling(registerInfo:any): void {
    const customerInfo = { id:this.totalCustomerCount, peopleCount:registerInfo.peopleCount, phoneNumber:registerInfo.phoneNumber, status:CustomerStatus.waiting};
    this.store.addCustomer(new Customer(customerInfo));
    this.resetRegisterInfo();
  }

  resetRegisterInfo() {
    this.registerInfo = { peopleCount: 0, phoneNumber: ''};
  }

  cancelReservation(reservationId: number): void {
    this.store.removeReservation(reservationId);
  }

  endTable(tableId: number): void {
    this.store.endTable(tableId);
  }

  addTable(tableInfo:any): void {
    const tableIdList = this.store.tables.map((table)=> {
      return table.id;
    })

    const tableData = {
      id: tableIdList[tableIdList.length-1] + 1,
      storeId: this.store.id,
      maxCapacity: tableInfo.maxCapacity,
      location: tableInfo.location,
      isUsing: false
    };

    this.store.addTable(new Table(tableData));

    alert(`${tableInfo.location} 테이블이 추가 됐습니다.`);
  }

  removeTable(tableId: number): void {
    this.store.removeTable(tableId);
  }
}
