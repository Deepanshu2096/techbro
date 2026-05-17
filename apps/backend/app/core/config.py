from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    shopify_api_key: str = ""
    shopify_api_secret: str = ""
    shopify_app_url: str = ""

    ebay_client_id: str = ""
    ebay_client_secret: str = ""

    cors_origins: list[str] = ["http://localhost:3000"]


settings = Settings()
