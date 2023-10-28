import { Component } from '@angular/core';
import { Product, ProductData } from '../class/Product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chapter08';
  public products: Product[] = [];
  public tempProduct: ProductData;
  public readyToRender = false;
  public totalPrice = 0;

  constructor() {
    this.tempProduct = { id: '', name: '', price: 0 };
    this.readyToRender = true;
  }

  addProduct(product: ProductData): void {
    const tempProduct = new Product(product);
    if (!tempProduct.idVerifier()) {
      console.error('Product1 is not in stock');
      return;
    }
    this.products.push(tempProduct);
  }

  calculateTotalPrice(): number {
    return this.products.reduce((previousValue, currentValue) => +previousValue + +currentValue.price, 0);
  }

  removeProduct(productId: string): void {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const product = this.products.splice(index, 1);
      console.log(`Product removed: ${product[0].name}`);
    } else {
      console.log('Product1 not found in the cart');
    }
  }


  printReceipt(): void {
    this.totalPrice = this.calculateTotalPrice()
  }

  clearCart(): void {
    this.products.length = 0;
  }

}
