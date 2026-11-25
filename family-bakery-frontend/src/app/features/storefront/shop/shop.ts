import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductCard } from '../products/product-card/product-card';
import { Cart } from '../services/cart';

import { Product, ProductService } from '../services/product';

type ProductCategory = 'all' | Product['category'];

type SortOption = 'featured' | 'price-low' | 'price-high' | 'popular';

@Component({
  selector: 'app-shop',
  imports: [ProductCard],
  templateUrl: './shop.html',
  styleUrl: './shop.css',
})
export class Shop {
  private productService = inject(ProductService);
  private route = inject(ActivatedRoute);
  private cartService = inject(Cart);

  products: Product[] = this.productService.getProducts();

  selectedCategory: ProductCategory = 'all';

  searchTerm = '';

  sortOption: SortOption = 'featured';

  constructor() {
    const category = this.route.snapshot.queryParamMap.get('category');

    if (
      category === 'breads' ||
      category === 'bagels' ||
      category === 'cookies' ||
      category === 'pastries'
    ) {
      this.selectedCategory = category;
    }
  }

  get filteredProducts(): Product[] {
    let result = [...this.products];

    // Filter by category
    if (this.selectedCategory !== 'all') {
      result = result.filter((product) => product.category === this.selectedCategory);
    }

    // Search products
    const term = this.searchTerm.trim().toLowerCase();

    if (term) {
      result = result.filter((product) =>
        (product.name + ' ' + product.description + ' ' + product.category)
          .toLowerCase()
          .includes(term),
      );
    }

    // Sort products
    switch (this.sortOption) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;

      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;

      case 'popular':
      case 'featured':
        result.sort((a, b) => b.popularity - a.popularity);
        break;
    }

    return result;
  }

  selectCategory(category: ProductCategory): void {
    this.selectedCategory = category;
  }

  onSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchTerm = input.value;
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.sortOption = select.value as SortOption;
  }

  handleAddToBag(product: Product): void {
    this.cartService.addToCart(product);
  }
}
