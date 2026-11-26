from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.database import get_db
from app.models import Category, Product
from app.schemas import CategoryRead, ProductRead

router = APIRouter(tags=["storefront"])


@router.get("/categories", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)):
    """Return every product category."""
    return db.scalars(select(Category).order_by(Category.name)).all()


@router.get("/products", response_model=list[ProductRead])
def list_products(category: str | None = None, db: Session = Depends(get_db)):
    """Return the product catalog, optionally filtered by category slug."""
    stmt = select(Product).options(joinedload(Product.category)).order_by(Product.name)

    if category is not None:
        stmt = stmt.join(Product.category).where(Category.slug == category)

    return db.scalars(stmt).all()


@router.get("/products/{slug}", response_model=ProductRead)
def get_product(slug: str, db: Session = Depends(get_db)):
    """Return a single product by its slug."""
    product = db.scalar(
        select(Product).options(joinedload(Product.category)).where(Product.slug == slug)
    )

    if product is None:
        raise HTTPException(status_code=404, detail="Product not found")

    return product
