import { Routes } from '@angular/router';

import { StorefrontLayout } from './layouts/storefront-layout/storefront-layout';

import { HomeComponent } from './features/storefront/home/home';
import { Shop } from './features/storefront/shop/shop';
import { ProductDetails } from './features/storefront/product-details/product-details';
import { CartComponent } from './features/storefront/cart/cart';
import { Checkout } from './features/storefront/checkout/checkout';
import { Contact } from './features/storefront/contact/contact';
import { Register } from './features/auth/register/register';
import { Login } from './features/auth/login/login';
import { ForgotPassword } from './features/auth/forgot-password/forgot-password';

export const routes: Routes = [
  {
    path: '',
    component: StorefrontLayout,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'shop',
        component: Shop,
      },
      {
        path: 'product/:id',
        component: ProductDetails,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: 'checkout',
        component: Checkout,
      },
      {
        path: 'contact',
        component: Contact,
      },
      {
        path: 'register',
        component: Register,
      },
      {
        path: 'login',
        component: Login,
      },
      {
        path: 'forgot-password',
        component: ForgotPassword,
      },
    ],
  },
];
