import { Component } from '@angular/core';

interface Product {
  id: string;
  name: string;
  price: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'chapter08';
  public products: Product[] = [];
  public tempProduct: Product;
  public readyToRender = false;
  public totalPrice = 0;

  constructor() {
    this.tempProduct = { id: '', name: '', price: 0 };
    this.readyToRender = true;
  }

  addProduct(product: Product): void {
    if (!this.isProductInStock(product)) {
      console.error('Product is not in stock');
      return;
    }


    this.products.push({ ...product });
    console.log(`Product added: ${product.name}`);
  }

  calculateTotalPrice(): number {
    let total = 0;
    for (const product of this.products) {
      total += +product.price;
    }
    return total;
  }

  removeProduct(productId: string): void {
    const index = this.products.findIndex(product => product.id === productId);
    if (index !== -1) {
      const product = this.products.splice(index, 1);
      console.log(`Product removed: ${product[0].name}`);
    } else {
      console.log('Product not found in the cart');
    }
  }

  private isProductInStock(product: Product): boolean {
    // Dummy stock check implementation
    return product.id.startsWith('item');
  }

  printReceipt(): void {
    console.log('--- Receipt ---');
    for (const product of this.products) {
      console.log(`${product.name}: $${product.price}`);
    }
    this.totalPrice = this.calculateTotalPrice();
  }

    clearCart(): void {
        this.products.length = 0;  // This effectively empties the array.
        console.log('The cart has been cleared');
    }

}
