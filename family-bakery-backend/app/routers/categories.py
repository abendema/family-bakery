from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Category
from app.schemas import CategoryRead

router = APIRouter(tags=["storefront"])


@router.get("/categories", response_model=list[CategoryRead])
def list_categories(db: Session = Depends(get_db)):
    """Return every product category."""
    return db.scalars(select(Category).order_by(Category.name)).all()
