from pydantic import BaseModel, ConfigDict


class CategoryRead(BaseModel):
    """Category as returned by the storefront API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    name: str
    slug: str
    description: str | None = None


class ProductRead(BaseModel):
    """Product as returned by the storefront API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    name: str
    description: str | None = None
    price: float
    image_url: str | None = None
    tag: str | None = None
    popularity: int
    stock: int
    is_available: bool
    category: CategoryRead
