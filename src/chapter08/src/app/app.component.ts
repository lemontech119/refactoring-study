import { Component } from '@angular/core';
import { Product, Receipt } from './product';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chapter08';
  public receipt:Receipt;
  public productInfo = {id:'' ,name:'' ,price:0};
  public readyToRender = false;

  constructor() {
    this.receipt = new Receipt();
    this.readyToRender = true;
  }

  addProduct(): void {
    const product = new Product(this.productInfo);
    this.receipt.addProduct(product);
  }

  removeProduct(id: string): void {
    this.receipt.removeProduct(id);
  }

  printReceipt(): void {
    console.log('--- Receipt ---');
    for (const product of this.receipt.list) {
      console.log(`${product.name}: $${product.price}`);
    }
  }

  clearReceipt(): void {
      this.receipt.clear();
      console.log('The cart has been cleared');
  }
}
