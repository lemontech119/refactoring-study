import { Customer } from './customer';
import { TTable } from './type';

export class Table {
  private _id:number;
  private _storeId:number;
  private _maxCapacity:number;
  private _location:string;
  private _isUsing:boolean;
  private _customer: Customer | undefined;

  constructor(data:TTable) {
    this._id = data.id;
    this._storeId = data.storeId;
    this._maxCapacity = data.maxCapacity;
    this._location = data.location;
    this._isUsing = data.isUsing;
    this._customer = undefined;
  }

  get id() {
    return this._id
  }

  get storeId() {
    return this._storeId
  }
  get maxCapacity() {
    return this._maxCapacity;
  }
  get location() {
    return this._location;
  }
  get isUsing() {
    return this._isUsing;
  }

  set isUsing(status:boolean) {
    this._isUsing = status;
  }

  get customer() {
    return this._customer;
  }

  set customer(customer:Customer|undefined) {
    this._customer = customer
  }

}
