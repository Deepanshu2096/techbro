from app.schemas.shopify_schema import ImportResult
from app.services import ebay_service, shopify_service


async def import_items(shop: str, access_token: str, item_ids: list[str]) -> list[ImportResult]:
    results = []
    for item_id in item_ids:
        try:
            ebay_product = await ebay_service.get_product(item_id)
            product_data = _transform(ebay_product)
            shopify_product = await shopify_service.create_product(shop, access_token, product_data)
            results.append(ImportResult(item_id=item_id, success=True, shopify_product_id=str(shopify_product["id"])))
        except Exception as exc:
            results.append(ImportResult(item_id=item_id, success=False, error=str(exc)))
    return results


def _transform(ebay_product) -> dict:
    return {
        "title": ebay_product.title,
        "body_html": ebay_product.description or "",
        "vendor": "eBay",
        "product_type": ebay_product.category or "",
        "variants": [
            {
                "price": str(ebay_product.price),
                "inventory_management": None,
            }
        ],
        "images": [{"src": ebay_product.image_url}] if ebay_product.image_url else [],
    }
