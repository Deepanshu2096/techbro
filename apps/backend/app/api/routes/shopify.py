from fastapi import APIRouter, HTTPException

from app.schemas.shopify_schema import ImportRequest, ImportResponse
from app.services import import_service

router = APIRouter(prefix="/shopify", tags=["shopify"])


@router.post("/import", response_model=ImportResponse)
async def import_products(request: ImportRequest):
    try:
        results = await import_service.import_items(request.shop, request.access_token, request.item_ids)
        return ImportResponse(results=results)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))
