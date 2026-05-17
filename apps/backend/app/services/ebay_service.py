import httpx
from app.core.config import settings
from app.schemas.ebay_schema import EbayProduct


EBAY_API_BASE = "https://api.ebay.com"
EBAY_AUTH_URL = "https://api.ebay.com/identity/v1/oauth2/token"


async def get_app_token() -> str:
    import base64

    credentials = f"{settings.ebay_client_id}:{settings.ebay_client_secret}"
    encoded = base64.b64encode(credentials.encode()).decode()

    async with httpx.AsyncClient() as client:
        response = await client.post(
            EBAY_AUTH_URL,
            headers={
                "Authorization": f"Basic {encoded}",
                "Content-Type": "application/x-www-form-urlencoded",
            },
            data={"grant_type": "client_credentials", "scope": "https://api.ebay.com/oauth/api_scope"},
        )
        response.raise_for_status()
        return response.json()["access_token"]


async def search_products(query: str, limit: int = 20) -> list[EbayProduct]:
    token = await get_app_token()

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{EBAY_API_BASE}/buy/browse/v1/item_summary/search",
            headers={"Authorization": f"Bearer {token}"},
            params={"q": query, "limit": limit},
        )
        response.raise_for_status()
        items = response.json().get("itemSummaries", [])

    return [_map_item(item) for item in items]


async def get_product(item_id: str) -> EbayProduct:
    token = await get_app_token()

    async with httpx.AsyncClient() as client:
        response = await client.get(
            f"{EBAY_API_BASE}/buy/browse/v1/item/{item_id}",
            headers={"Authorization": f"Bearer {token}"},
        )
        response.raise_for_status()
        return _map_item(response.json())


def _map_item(item: dict) -> EbayProduct:
    price_info = item.get("price", {})
    images = item.get("image", {})
    return EbayProduct(
        item_id=item.get("itemId", ""),
        title=item.get("title", ""),
        price=float(price_info.get("value", 0)),
        currency=price_info.get("currency", "USD"),
        image_url=images.get("imageUrl"),
        description=item.get("shortDescription"),
        condition=item.get("condition"),
        category=item.get("categories", [{}])[0].get("categoryName") if item.get("categories") else None,
    )
