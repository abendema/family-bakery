import { Injectable, computed, signal } from '@angular/core';
import { Product } from './product';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class Cart {
  private readonly storageKey = 'family-bakery-cart';

  private readonly cartItems = signal<CartItem[]>(this.loadCart());

  // Read only cart information for components
  items = this.cartItems.asReadonly();

  // Total number of individual items
  totalItems = computed(() => this.cartItems().reduce((total, item) => total + item.quantity, 0));

  // Total price of all cart items
  subtotal = computed(() =>
    this.cartItems().reduce((total, item) => total + item.product.price * item.quantity, 0),
  );

  // Add a product to the cart
  addToCart(product: Product, quantity: number = 1): void {
    if (!Number.isInteger(quantity) || quantity <= 0) {
      return;
    }

    this.cartItems.update((items) => {
      const existingItem = items.find((item) => item.product.id === product.id);

      if (existingItem) {
        return items.map((item) =>
          item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item,
        );
      }

      return [...items, { product, quantity }];
    });

    this.saveCart();
  }

  // Remove a product completely
  removeFromCart(productId: string): void {
    this.cartItems.update((items) => items.filter((item) => item.product.id !== productId));

    this.saveCart();
  }

  // Update the quantity of a product
  updateQuantity(productId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(productId);
      return;
    }

    this.cartItems.update((items) =>
      items.map((item) => (item.product.id === productId ? { ...item, quantity } : item)),
    );

    this.saveCart();
  }

  // Empty the entire cart
  clearCart(): void {
    this.cartItems.set([]);
    this.saveCart();
  }

  // Load previously saved cart data
  private loadCart(): CartItem[] {
    try {
      const storedCart = localStorage.getItem(this.storageKey);

      return storedCart ? (JSON.parse(storedCart) as CartItem[]) : [];
    } catch {
      return [];
    }
  }

  // Save the current cart
  private saveCart(): void {
    localStorage.setItem(this.storageKey, JSON.stringify(this.cartItems()));
  }
}
