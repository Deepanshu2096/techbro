import hashlib
import hmac


def verify_shopify_hmac(secret: str, data: str, received_hmac: str) -> bool:
    computed = hmac.new(secret.encode(), data.encode(), hashlib.sha256).hexdigest()
    return hmac.compare_digest(computed, received_hmac)
