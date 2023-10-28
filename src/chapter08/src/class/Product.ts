export interface ProductData {
  id: string;
  name: string;
  price: number;
}
export class Product {
  private _id: string;
  private _name: string;
  private _price: number;

  constructor(data: ProductData) {
    this._id = data.id;
    this._name= data.name;
    this._price = data.price;
  }

  get id(){
    return this._id;
  }

  get name(){
    return this._name
  }

  get price() {
    return this._price
  }

  public idVerifier() {
    return this._id.startsWith('item')
  }
}