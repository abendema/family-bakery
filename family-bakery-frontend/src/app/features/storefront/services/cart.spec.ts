import { TestBed } from '@angular/core/testing';

import { Product } from './product';
import { Cart } from './cart';

function product(id: number, slug: string, price = 5): Product {
  return {
    id,
    slug,
    name: slug,
    category: 'breads',
    price,
    popularity: 1,
    image: '',
    tag: '',
    description: '',
  };
}

describe('Cart', () => {
  function createCart(): Cart {
    TestBed.configureTestingModule({});

    return TestBed.inject(Cart);
  }

  beforeEach(() => {
    localStorage.clear();
  });

  it('should be created', () => {
    expect(createCart()).toBeTruthy();
  });

  it('merges quantities for the same numeric product id', () => {
    const cart = createCart();

    cart.addToCart(product(1, 'country-sourdough'), 2);
    cart.addToCart(product(1, 'country-sourdough'), 3);

    expect(cart.items().length).toBe(1);
    expect(cart.items()[0].quantity).toBe(5);
  });

  it('keeps separate lines keyed by numeric id', () => {
    const cart = createCart();

    cart.addToCart(product(1, 'country-sourdough'));
    cart.addToCart(product(2, 'poppy-bagel'));

    expect(cart.items().map((item) => item.product.id)).toEqual([1, 2]);
    expect(cart.totalItems()).toBe(2);
  });

  it('updates and removes items by numeric id', () => {
    const cart = createCart();

    cart.addToCart(product(1, 'country-sourdough'));
    cart.addToCart(product(2, 'poppy-bagel'));

    cart.updateQuantity(1, 4);
    expect(cart.items().find((item) => item.product.id === 1)?.quantity).toBe(4);

    cart.removeFromCart(2);
    expect(cart.items().map((item) => item.product.id)).toEqual([1]);
  });

  it('saves items to localStorage', () => {
    const cart = createCart();

    cart.addToCart(product(1, 'country-sourdough'), 2);

    expect(JSON.parse(localStorage.getItem('family-bakery-cart') ?? 'null')).toEqual([
      { product: product(1, 'country-sourdough'), quantity: 2 },
    ]);
  });

  it('restores items from localStorage', () => {
    localStorage.setItem(
      'family-bakery-cart',
      JSON.stringify([{ product: product(1, 'country-sourdough'), quantity: 2 }]),
    );

    const cart = createCart();

    expect(cart.items().length).toBe(1);
    expect(cart.items()[0].product.id).toBe(1);
    expect(cart.items()[0].quantity).toBe(2);
  });
});
