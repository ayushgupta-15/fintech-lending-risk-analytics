from fastapi import APIRouter
from app.core.database import get_db_connection

router = APIRouter(tags=["Health"])

@router.get("/health")
def health_check():
    db_status = "disconnected"
    try:
        with get_db_connection() as db:
            db.execute("SELECT 1")
            db_status = "connected"
    except Exception:
        pass
    
    return {
        "status": "healthy" if db_status == "connected" else "degraded",
        "database": db_status,
        "warehouse": "ready" if db_status == "connected" else "unavailable"
    }
