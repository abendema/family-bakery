import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

import { Cart as CartService } from '../services/cart';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CurrencyPipe, RouterLink],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css',
})
export class Checkout {
  private formBuilder = inject(FormBuilder);
  private cartService = inject(CartService);

  cartItems = this.cartService.items;
  totalItems = this.cartService.totalItems;
  subtotal = this.cartService.subtotal;

  checkoutForm = this.formBuilder.group({
    fullName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],

    fulfillment: ['delivery', Validators.required],

    address: ['', Validators.required],
    city: ['', Validators.required],
    postalCode: ['', Validators.required],

    instructions: [''],
  });

  constructor() {
    this.checkoutForm.controls.fulfillment.valueChanges.subscribe((method) => {
      this.updateDeliveryValidators(method);
    });
  }

  get isDelivery(): boolean {
    return this.checkoutForm.controls.fulfillment.value === 'delivery';
  }

  private updateDeliveryValidators(method: string | null): void {
    const deliveryControls = [
      this.checkoutForm.controls.address,
      this.checkoutForm.controls.city,
      this.checkoutForm.controls.postalCode,
    ];

    if (method === 'delivery') {
      deliveryControls.forEach((control) => {
        control.setValidators([Validators.required]);
      });
    } else {
      deliveryControls.forEach((control) => {
        control.clearValidators();
        control.reset('');
      });
    }

    deliveryControls.forEach((control) => {
      control.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    // Order submission will be implemented later.
  }
}
