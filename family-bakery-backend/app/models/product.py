from sqlalchemy import (
    Boolean,
    CheckConstraint,
    Column,
    DateTime,
    ForeignKey,
    Integer,
    Numeric,
    String,
    Text,
    func,
)
from sqlalchemy.orm import relationship

from app.database import Base


class Product(Base):
    """A bakery product displayed in the Family Bakery storefront"""

    __tablename__ = "products"
    __table_args__ = (
        CheckConstraint("price >= 0", name="ck_products_price_non_negative"),
        CheckConstraint("stock >= 0", name="ck_products_stock_non_negative"),
    )

    id = Column(Integer, primary_key=True, index=True)
    slug = Column(String(160), nullable=False, unique=True, index=True)
    name = Column(String(150), nullable=False, index=True)
    description = Column(Text, nullable=True)
    category_id = Column(
        Integer,
        ForeignKey("categories.id", ondelete="RESTRICT"),
        nullable=False,
        index=True,
    )
    price = Column(Numeric(10, 2), nullable=False)
    image_url = Column(String(500), nullable=True)
    tag = Column(String(60), nullable=True)
    popularity = Column(Integer, nullable=False, default=0, server_default="0")
    stock = Column(Integer, nullable=False, default=0, server_default="0")
    is_available = Column(Boolean, nullable=False, default=True, server_default="true")
    created_at = Column(DateTime(timezone=True), server_default=func.now(), nullable=False)

    category = relationship("Category", back_populates="products")
    order_items = relationship("OrderItem", back_populates="product")
