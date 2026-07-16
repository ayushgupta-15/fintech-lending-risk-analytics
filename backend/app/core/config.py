from pydantic_settings import BaseSettings, SettingsConfigDict

class Settings(BaseSettings):
    PROJECT_NAME: str = "Enterprise Credit Risk Platform"
    API_VERSION: str = "v1.0.0"
    DEBUG: bool = True
    
    # Database Configuration
    DATABASE_URL: str = "postgresql://admin:adminpassword@localhost:5433/enterprise_risk"
    
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

settings = Settings()
