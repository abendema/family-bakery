import { Component, OnInit, inject, signal } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';

import { Product, ProductService } from '../services/product';
import { Cart } from '../services/cart';

@Component({
  selector: 'app-product-details',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails implements OnInit {
  private route = inject(ActivatedRoute);
  private productService = inject(ProductService);
  private cartService = inject(Cart);

  readonly product = signal<Product | null>(null);

  readonly loading = signal(true);

  readonly notFound = signal(false);

  readonly error = signal<string | null>(null);

  quantity = 1;

  ngOnInit(): void {
    const slug = this.route.snapshot.paramMap.get('slug');

    if (!slug) {
      this.loading.set(false);
      this.notFound.set(true);
      return;
    }

    this.productService.getProductBySlug(slug).subscribe({
      next: (product) => {
        this.product.set(product);
        this.loading.set(false);
      },
      error: (err: unknown) => {
        this.loading.set(false);

        if (err instanceof HttpErrorResponse && err.status === 404) {
          this.notFound.set(true);
        } else {
          this.error.set('We could not load this product. Please try again.');
        }
      },
    });
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
    const product = this.product();

    if (!product) {
      return;
    }

    this.cartService.addToCart(product, this.quantity);
  }
}
