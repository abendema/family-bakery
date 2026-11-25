import { Injectable } from '@angular/core';

export interface Product {
  id: string;
  name: string;
  category: 'breads' | 'bagels' | 'cookies' | 'pastries';
  price: number;
  popularity: number;
  image: string;
  tag: string;
  description: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 'country-sourdough',
      name: 'Country Sourdough',
      category: 'breads',
      price: 7.5,
      popularity: 98,
      image: '/assets/sup-bread.jpg',
      tag: 'Bestseller',
      description:
        'A rustic, slow-fermented loaf with a crisp golden crust, a tender open crumb and a gentle tang. Lovely with butter or alongside dinner.',
    },
    {
      id: 'seeded-wheat',
      name: 'Seeded Wheat Loaf',
      category: 'breads',
      price: 6.75,
      popularity: 86,
      image: '/assets/breads.jpg',
      tag: 'Daily bake',
      description:
        'A hearty wheat loaf finished with a generous mix of seeds. Nutty, satisfying and perfect for everyday sandwiches.',
    },
    {
      id: 'classic-baguette',
      name: 'Classic Baguette',
      category: 'breads',
      price: 4.25,
      popularity: 81,
      image: '/assets/bread.jpg',
      tag: 'Fresh daily',
      description:
        'A beautifully crisp crust with a light, airy centre. Best enjoyed on the day it is baked.',
    },
    {
      id: 'poppy-bagel',
      name: 'Poppy Seed Bagel',
      category: 'bagels',
      price: 2.75,
      popularity: 94,
      image: '/assets/bagels.jpg',
      tag: 'Bestseller',
      description:
        'A classic chewy bagel topped with poppy seeds. Delicious toasted, with cream cheese or your favourite filling.',
    },
    {
      id: 'sesame-bagel',
      name: 'Sesame Bagel',
      category: 'bagels',
      price: 2.75,
      popularity: 78,
      image: '/assets/bagels.jpg',
      tag: 'Classic',
      description:
        'Golden, chewy and covered in toasted sesame seeds. A simple bakery favourite for breakfast or lunch.',
    },
    {
      id: 'chocolate-chip-cookie',
      name: 'Chocolate Chip Cookie',
      category: 'cookies',
      price: 2.5,
      popularity: 99,
      image: '/assets/cookies1.jpg',
      tag: 'Bestseller',
      description:
        'A soft-centred cookie with crisp edges and generous chocolate pieces. A little treat for any time of day.',
    },
    {
      id: 'double-chocolate-cookie',
      name: 'Double Chocolate Cookie',
      category: 'cookies',
      price: 2.85,
      popularity: 89,
      image: '/assets/cookies1.jpg',
      tag: 'Rich & lovely',
      description:
        'Deep cocoa flavour with chocolate throughout. Soft, rich and made for chocolate lovers.',
    },
    {
      id: 'butter-croissant',
      name: 'Butter Croissant',
      category: 'pastries',
      price: 3.5,
      popularity: 97,
      image: '/assets/bread.jpg',
      tag: 'Morning favourite',
      description:
        'Flaky, golden layers with a delicate buttery centre. A lovely companion to your morning coffee.',
    },
    {
      id: 'chocolate-pastry',
      name: 'Chocolate Pastry',
      category: 'pastries',
      price: 3.95,
      popularity: 91,
      image: '/assets/breads.jpg',
      tag: 'Sweet treat',
      description:
        'A tender, golden pastry with a rich chocolate filling and delicate crisp layers.',
    },
    {
      id: 'almond-macarons',
      name: 'Chocolate Macarons',
      category: 'pastries',
      price: 4.5,
      popularity: 75,
      image: '/assets/cookies1.jpg',
      tag: 'Little luxury',
      description:
        'Delicate chocolate almond shells with a smooth chocolate-style filling. Sold as a pair.',
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: string): Product | undefined {
    return this.products.find((product) => product.id === id);
  }
}
