from pydantic import BaseModel


class EbayProduct(BaseModel):
    item_id: str
    title: str
    price: float
    currency: str
    image_url: str | None = None
    description: str | None = None
    condition: str | None = None
    category: str | None = None


class EbaySearchRequest(BaseModel):
    query: str
    limit: int = 20


class EbaySearchResponse(BaseModel):
    products: list[EbayProduct]
    total: int
