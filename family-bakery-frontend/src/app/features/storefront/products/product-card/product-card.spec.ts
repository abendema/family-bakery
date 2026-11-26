import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { ProductCard } from './product-card';

describe('ProductCard', () => {
  let component: ProductCard;
  let fixture: ComponentFixture<ProductCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductCard);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('product', {
      id: 1,
      slug: 'country-sourdough',
      name: 'Country Sourdough',
      category: 'breads',
      price: 8.5,
      popularity: 95,
      image: '',
      tag: 'Bestseller',
      description: 'Naturally leavened sourdough.',
    });
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('links to the detail route using the product slug', () => {
    const anchor = fixture.nativeElement.querySelector('a') as HTMLAnchorElement;

    expect(anchor.getAttribute('href')).toBe('/product/country-sourdough');
  });
});
