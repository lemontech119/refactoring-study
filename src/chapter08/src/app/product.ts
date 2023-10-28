interface ProductInfo {
  id: string;
  name: string;
  price: number;
}

export class Product {
  private _id:string;
  private _name:string;
  private _price:number;

  constructor(data:ProductInfo) {
    this._id = data.id;
    this._name = data.name;
    this._price = data.price;
  }

  get id() {return this._id}
  set id(id) {this._id = id}
  get name() {return this._name}
  set name(name) {this._name = name}
  get price() {return this._price}
  set price(price) {this._price = price}
}

export class Receipt {
  private _list:Product[];
  private _totalPrice: number;

  constructor() {
    this._list = [];
    this._totalPrice = 0;
  }

  get list() {return this._list}
  get totalPrice() {return this._totalPrice}

  addProduct(product:Product) {
    if (!product.id.startsWith('item')) {
      throw new Error('Product is not in stock')
    }

    this._list.push(product);
    this.calculateTotalPrice();
  }

  removeProduct(id:string) {
    const index = this._list.findIndex(product => product.id === id);
    if (index !== -1) {
      const product = this._list.splice(index, 1);
      console.log(`Product removed: ${product[0].name}`);
    } else {
      console.log('Product not found in the cart');
    }
    this.calculateTotalPrice();
  }

  calculateTotalPrice() {
    const priceList = this.list.map((product)=>{
      return product.price;
    })
    this._totalPrice = priceList.reduce((accumulator, current)=> accumulator + current, 0);
  }

  clear() {
    this._list.length = 0;
    this._totalPrice = 0;
  }
}
