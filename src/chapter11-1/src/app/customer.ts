import { CustomerStatus } from './interface';
import { TCustomers } from './type';

export class Customer {
  private _id:number;
  private _peopleCount: number;
  private _phoneNumber:string;
  private _status: CustomerStatus;

  constructor(data:TCustomers) {
    this._id = data.id;
    this._peopleCount = data.peopleCount;
    this._phoneNumber = data.phoneNumber;
    this._status = CustomerStatus.waiting;
  }

  get id() {
    return this._id;
  }

  get peopleCount() {
    return this._peopleCount;
  }

  get phoneNumber() {
    return this._phoneNumber;
  }

  get status() {
    return this._status;
  }

  set status(status:CustomerStatus) {
    this._status = status;
  }
}
