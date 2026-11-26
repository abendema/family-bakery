"""Add the initial categories and products to the database.

Run this script using:
    .\\venv\\Scripts\\python.exe -m app.seed

This script is idempotent:You can run it multiple times. It only adds missing data and does not change existing records.
"""

from decimal import Decimal

from sqlalchemy import select

from app.database import SessionLocal
from app.models import Category, Product

# Stock is a placeholder for the future admin dashboard.
DEFAULT_STOCK = 100

CATEGORIES = [
    {"slug": "breads", "name": "Breads", "description": "Freshly baked loaves and baguettes."},
    {"slug": "bagels", "name": "Bagels", "description": "Chewy, hand-rolled bagels."},
    {"slug": "cookies", "name": "Cookies", "description": "Soft, freshly baked cookies."},
    {"slug": "pastries", "name": "Pastries", "description": "Flaky pastries and sweet treats."},
]

PRODUCTS = [
    {
        "slug": "country-sourdough",
        "name": "Country Sourdough",
        "category": "breads",
        "price": Decimal("7.50"),
        "popularity": 98,
        "image_url": "/assets/sup-bread.jpg",
        "tag": "Bestseller",
        "description": (
            "A rustic, slow-fermented loaf with a crisp golden crust, a tender open crumb "
            "and a gentle tang. Lovely with butter or alongside dinner."
        ),
    },
    {
        "slug": "seeded-wheat",
        "name": "Seeded Wheat Loaf",
        "category": "breads",
        "price": Decimal("6.75"),
        "popularity": 86,
        "image_url": "/assets/breads.jpg",
        "tag": "Daily bake",
        "description": (
            "A hearty wheat loaf finished with a generous mix of seeds. Nutty, satisfying "
            "and perfect for everyday sandwiches."
        ),
    },
    {
        "slug": "classic-baguette",
        "name": "Classic Baguette",
        "category": "breads",
        "price": Decimal("4.25"),
        "popularity": 81,
        "image_url": "/assets/bread.jpg",
        "tag": "Fresh daily",
        "description": (
            "A beautifully crisp crust with a light, airy centre. Best enjoyed on the day "
            "it is baked."
        ),
    },
    {
        "slug": "poppy-bagel",
        "name": "Poppy Seed Bagel",
        "category": "bagels",
        "price": Decimal("2.75"),
        "popularity": 94,
        "image_url": "/assets/bagels.jpg",
        "tag": "Bestseller",
        "description": (
            "A classic chewy bagel topped with poppy seeds. Delicious toasted, with cream "
            "cheese or your favourite filling."
        ),
    },
    {
        "slug": "sesame-bagel",
        "name": "Sesame Bagel",
        "category": "bagels",
        "price": Decimal("2.75"),
        "popularity": 78,
        "image_url": "/assets/bagels.jpg",
        "tag": "Classic",
        "description": (
            "Golden, chewy and covered in toasted sesame seeds. A simple bakery favourite "
            "for breakfast or lunch."
        ),
    },
    {
        "slug": "chocolate-chip-cookie",
        "name": "Chocolate Chip Cookie",
        "category": "cookies",
        "price": Decimal("2.50"),
        "popularity": 99,
        "image_url": "/assets/cookies1.jpg",
        "tag": "Bestseller",
        "description": (
            "A soft-centred cookie with crisp edges and generous chocolate pieces. A little "
            "treat for any time of day."
        ),
    },
    {
        "slug": "double-chocolate-cookie",
        "name": "Double Chocolate Cookie",
        "category": "cookies",
        "price": Decimal("2.85"),
        "popularity": 89,
        "image_url": "/assets/cookies1.jpg",
        "tag": "Rich & lovely",
        "description": (
            "Deep cocoa flavour with chocolate throughout. Soft, rich and made for "
            "chocolate lovers."
        ),
    },
    {
        "slug": "butter-croissant",
        "name": "Butter Croissant",
        "category": "pastries",
        "price": Decimal("3.50"),
        "popularity": 97,
        "image_url": "/assets/bread.jpg",
        "tag": "Morning favourite",
        "description": (
            "Flaky, golden layers with a delicate buttery centre. A lovely companion to "
            "your morning coffee."
        ),
    },
    {
        "slug": "chocolate-pastry",
        "name": "Chocolate Pastry",
        "category": "pastries",
        "price": Decimal("3.95"),
        "popularity": 91,
        "image_url": "/assets/breads.jpg",
        "tag": "Sweet treat",
        "description": (
            "A tender, golden pastry with a rich chocolate filling and delicate crisp layers."
        ),
    },
    {
        "slug": "almond-macarons",
        "name": "Chocolate Macarons",
        "category": "pastries",
        "price": Decimal("4.50"),
        "popularity": 75,
        "image_url": "/assets/cookies1.jpg",
        "tag": "Little luxury",
        "description": (
            "Delicate chocolate almond shells with a smooth chocolate-style filling. Sold "
            "as a pair."
        ),
    },
]


def main() -> None:
    added_categories = 0
    added_products = 0

    with SessionLocal() as db:
        for data in CATEGORIES:
            exists = db.scalar(select(Category).where(Category.slug == data["slug"]))
            if exists is None:
                db.add(Category(**data))
                added_categories += 1
        db.commit()

        categories = {c.slug: c for c in db.scalars(select(Category)).all()}

        for data in PRODUCTS:
            exists = db.scalar(select(Product).where(Product.slug == data["slug"]))
            if exists is not None:
                continue
            item = dict(data)
            category_slug = item.pop("category")
            db.add(
                Product(
                    category_id=categories[category_slug].id,
                    stock=DEFAULT_STOCK,
                    is_available=True,
                    **item,
                )
            )
            added_products += 1
        db.commit()

    print(f"Seeded {added_categories} new categories and {added_products} new products.")


if __name__ == "__main__":
    main()
