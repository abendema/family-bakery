import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';

import { API_BASE_URL } from '../../../core/services/api';
import { ProductDetails } from './product-details';

/** Product data returned by the backend when fetching a product by slug. */
function apiProduct(slug: string, name: string) {
  return {
    id: 1,
    slug,
    name,
    description: 'Tasty.',
    price: 3.5,
    image_url: '/assets/bread.jpg',
    tag: 'Bestseller',
    popularity: 90,
    stock: 100,
    is_available: true,
    category: { id: 1, name: 'Breads', slug: 'breads', description: null },
  };
}

describe('ProductDetails', () => {
  let fixture: ComponentFixture<ProductDetails>;
  let httpMock: HttpTestingController;

  async function render(slug: string): Promise<void> {
    await TestBed.configureTestingModule({
      imports: [ProductDetails],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: convertToParamMap({ slug }) } },
        },
      ],
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProductDetails);
    fixture.detectChanges();
  }

  const products = [
    { slug: 'country-sourdough', name: 'Country Sourdough' },
    { slug: 'poppy-bagel', name: 'Poppy Seed Bagel' },
    { slug: 'chocolate-chip-cookie', name: 'Chocolate Chip Cookie' },
  ];

  for (const { slug, name } of products) {
    it(`requests the correct slug and renders "${name}"`, async () => {
      await render(slug);

      const req = httpMock.expectOne(`${API_BASE_URL}/products/${slug}`);
      expect(req.request.method).toBe('GET');
      req.flush(apiProduct(slug, name));

      fixture.detectChanges();

      expect(fixture.componentInstance.product()?.name).toBe(name);

      const compiled = fixture.nativeElement as HTMLElement;
      expect(compiled.querySelector('h1')?.textContent).toContain(name);
      expect(compiled.textContent).not.toContain('Product Not Found');
    });
  }

  it('shows the not-found state for a 404 response', async () => {
    await render('does-not-exist');

    httpMock
      .expectOne(`${API_BASE_URL}/products/does-not-exist`)
      .flush({ detail: 'Not Found' }, { status: 404, statusText: 'Not Found' });

    fixture.detectChanges();

    expect(fixture.componentInstance.notFound()).toBe(true);
    expect(fixture.nativeElement.textContent).toContain('Product Not Found');
  });
});
