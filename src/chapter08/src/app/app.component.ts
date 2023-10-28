import { Component } from '@angular/core';

export interface IProduct {
  id: string;
  name: string;
  price: number;
}

export class Product {
  private PRODUCT_ID_PREFIX = 'item';

  constructor(public id: string, public name: string, public price: number) {
    this.id = id;
    this.name = name;
    this.price = price;
  }

  public isValidItemId(): boolean {
    return this.id.startsWith(this.PRODUCT_ID_PREFIX);
  }
}

export class Cart {
  public products: Product[] = [];

  addProduct(product: IProduct): void {
    const newProduct = new Product(product.id, product.name, product.price);
    if (newProduct.isValidItemId()) {
      this.products.push(newProduct);
    }
  }

  calculateTotalPrice(): number {
    let totalPrice = 0;
    this.products.forEach((product) => {
      totalPrice += +product.price;
    });

    return totalPrice;
  }

  removeProduct(productId: string): void {
    const index = this.products.findIndex(
      (product) => product.id === productId
    );
    if (index !== -1) {
      this.products.splice(index, 1);
    }
  }

  clear(): void {
    this.products.length = 0;
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'chapter08';
  public cart: Cart = new Cart();
  public tempProduct: IProduct;
  public readyToRender = false;
  public totalPrice = 0;
  // private readonly

  constructor() {
    this.tempProduct = {
      id: '',
      name: '',
      price: 0,
    };
    this.cart = new Cart();
    this.readyToRender = true;
  }

  printReceipt(): void {
    this.totalPrice = this.cart.calculateTotalPrice();
  }
}
