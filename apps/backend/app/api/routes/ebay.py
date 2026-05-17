from fastapi import APIRouter, HTTPException

from app.schemas.ebay_schema import EbaySearchRequest, EbaySearchResponse
from app.services import ebay_service

router = APIRouter(prefix="/ebay", tags=["ebay"])


@router.post("/search", response_model=EbaySearchResponse)
async def search(request: EbaySearchRequest):
    try:
        products = await ebay_service.search_products(request.query, request.limit)
        return EbaySearchResponse(products=products, total=len(products))
    except Exception as exc:
        raise HTTPException(status_code=502, detail=str(exc))
