import secrets

from fastapi import APIRouter, HTTPException, Query
from fastapi.responses import RedirectResponse

from app.core.config import settings
from app.core.security import verify_shopify_hmac
from app.schemas.shopify_schema import ShopifySession
from app.services import auth_service

router = APIRouter(prefix="/auth", tags=["auth"])


@router.get("/install")
async def install(shop: str = Query(...)):
    state = secrets.token_hex(16)
    url = auth_service.build_install_url(shop, state)
    return RedirectResponse(url)


@router.get("/callback", response_model=ShopifySession)
async def callback(
    shop: str = Query(...),
    code: str = Query(...),
    hmac: str = Query(...),
    state: str = Query(None),
):
    params = f"code={code}&shop={shop}&state={state or ''}"
    if not verify_shopify_hmac(settings.shopify_api_secret, params, hmac):
        raise HTTPException(status_code=400, detail="Invalid HMAC signature")

    access_token = await auth_service.exchange_code_for_token(shop, code)
    return ShopifySession(shop=shop, access_token=access_token)
