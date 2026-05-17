from pydantic import BaseModel


class ShopifyAuthRequest(BaseModel):
    shop: str
    code: str
    hmac: str
    state: str | None = None


class ShopifySession(BaseModel):
    shop: str
    access_token: str


class ImportRequest(BaseModel):
    shop: str
    access_token: str
    item_ids: list[str]


class ImportResult(BaseModel):
    item_id: str
    success: bool
    shopify_product_id: str | None = None
    error: str | None = None


class ImportResponse(BaseModel):
    results: list[ImportResult]
