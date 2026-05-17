import httpx


async def create_product(shop: str, access_token: str, product_data: dict) -> dict:
    url = f"https://{shop}/admin/api/2024-01/products.json"
    headers = {"X-Shopify-Access-Token": access_token, "Content-Type": "application/json"}

    async with httpx.AsyncClient() as client:
        response = await client.post(url, headers=headers, json={"product": product_data})
        response.raise_for_status()
        return response.json()["product"]


async def get_products(shop: str, access_token: str, limit: int = 50) -> list[dict]:
    url = f"https://{shop}/admin/api/2024-01/products.json"
    headers = {"X-Shopify-Access-Token": access_token}

    async with httpx.AsyncClient() as client:
        response = await client.get(url, headers=headers, params={"limit": limit})
        response.raise_for_status()
        return response.json()["products"]
