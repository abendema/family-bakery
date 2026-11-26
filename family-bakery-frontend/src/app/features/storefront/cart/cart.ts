import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class CartComponent {
  private cartService = inject(CartService);

  cartItems = this.cartService.items;

  totalItems = this.cartService.totalItems;

  subtotal = this.cartService.subtotal;

  increaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity + 1);
  }

  decreaseQuantity(productId: number, currentQuantity: number): void {
    this.cartService.updateQuantity(productId, currentQuantity - 1);
  }

  removeItem(productId: number): void {
    this.cartService.removeFromCart(productId);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}