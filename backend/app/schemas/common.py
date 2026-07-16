from typing import Generic, TypeVar, Optional, Any
from pydantic import BaseModel
from datetime import datetime
from app.core.config import settings

T = TypeVar('T')

class Metadata(BaseModel):
    generated_at: str
    source: str
    version: str = settings.API_VERSION

class APIResponse(BaseModel, Generic[T]):
    success: bool = True
    data: T
    metadata: Metadata

def create_response(data: Any, source: str) -> APIResponse:
    return APIResponse(
        success=True,
        data=data,
        metadata=Metadata(
            generated_at=datetime.utcnow().isoformat() + "Z",
            source=source
        )
    )
