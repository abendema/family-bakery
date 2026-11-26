import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';

import { API_BASE_URL } from '../../../core/services/api';

export interface Product {
  /** Numeric database id*/
  id: number;
  /** Public URL identifier used in customer-facing routes. */
  slug: string;
  name: string;
  category: string;
  price: number;
  popularity: number;
  image: string;
  tag: string;
  description: string;
}

/** A category as returned by the backend API. */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string | null;
}

/** A product as returned by the backend API. */
interface ApiProduct {
  id: number;
  slug: string;
  name: string;
  description: string | null;
  price: number;
  image_url: string | null;
  tag: string | null;
  popularity: number;
  stock: number;
  is_available: boolean;
  category: Category;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);

  /** Fetch all product categories. */
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(`${API_BASE_URL}/categories`);
  }

  /** Fetch the full product catalog. */
  getProducts(): Observable<Product[]> {
    return this.http
      .get<ApiProduct[]>(`${API_BASE_URL}/products`)
      .pipe(map((products) => products.map(toProduct)));
  }

  /** Fetch a single product by its slug. */
  getProductBySlug(slug: string): Observable<Product> {
    return this.http
      .get<ApiProduct>(`${API_BASE_URL}/products/${slug}`)
      .pipe(map(toProduct));
  }
}

/** Converts an API product into the format used by the frontend. */
function toProduct(api: ApiProduct): Product {
  return {
    id: api.id,
    slug: api.slug,
    name: api.name,
    category: api.category.slug,
    price: api.price,
    popularity: api.popularity,
    image: api.image_url ?? '',
    tag: api.tag ?? '',
    description: api.description ?? '',
  };
}
