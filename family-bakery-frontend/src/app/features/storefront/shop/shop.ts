import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../products/product-card/product-card';
import { Cart } from '../services/cart';

import { Category, Product, ProductService } from '../services/product';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'popular';

const ALL_CATEGORY = 'all';

@Component({
  selector: 'app-shop',
  imports: [ProductCard],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop implements OnInit {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(Cart);

  private readonly products = signal<Product[]>([]);

  readonly categories = signal<Category[]>([]);

  readonly loading = signal(true);

  readonly error = signal<string | null>(null);

  readonly selectedCategory = signal<string>(ALL_CATEGORY);

  readonly searchTerm = signal('');

  readonly sortOption = signal<SortOption>('featured');

  readonly filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const term = this.searchTerm().trim().toLowerCase();

    let result = this.products();

    // Filter by category
    if (category !== ALL_CATEGORY) {
      result = result.filter((product) => product.category === category);
    }

    // Search products
    if (term) {
      result = result.filter((product) =>
        (product.name + ' ' + product.description + ' ' + product.category)
          .toLowerCase()
          .includes(term),
      );
    }

    // Sort products without mutating the filtered collection order
    const sorted = [...result];

    switch (this.sortOption()) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;

      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;

      case 'popular':
      case 'featured':
        sorted.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return sorted;
  });

  ngOnInit(): void {
    this.loadCategories();
    this.loadProducts();
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm.set(input.value);
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOption.set(select.value as SortOption);
  }

  handleAddToBag(product: Product): void {
    this.cartService.addToCart(product);
  }

  private loadCategories(): void {
    this.productService.getCategories().subscribe({
      next: (categories) => {
        this.categories.set(categories);
        this.applyCategoryFromQuery(categories);
      },
    });
  }

  private loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (products) => {
        this.products.set(products);
        this.loading.set(false);
      },
      error: () => {
        this.error.set('We could not load the products. Please try again.');
        this.loading.set(false);
      },
    });
  }

  private applyCategoryFromQuery(categories: Category[]): void {
    const category = this.route.snapshot.queryParamMap.get('category');

    if (category && categories.some((known) => known.slug === category)) {
      this.selectedCategory.set(category);
    }
  }
}
