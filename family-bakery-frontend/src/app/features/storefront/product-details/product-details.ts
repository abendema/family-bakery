import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product, ProductService } from '../services/product';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(Cart);

  product: Product | undefined;

  quantity = 1;

  constructor() {
    const productId = this.route.snapshot.paramMap.get('id');

    if (productId) {
      this.product = this.productService.getProductById(productId);
    }
  }

  increaseQuantity(): void {
    if (this.quantity < 20) {
      this.quantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  onQuantityChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const value = Number(input.value);

    if (Number.isInteger(value) && value >= 1 && value <= 20) {
      this.quantity = value;
    } else {
      this.quantity = 1;
    }
  }

  addToBag(): void {
    if (!this.product) {
      return;
    }

    this.cartService.addToCart(this.product, this.quantity);
  }
}
