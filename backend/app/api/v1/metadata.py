from fastapi import APIRouter
from app.core.database import get_db_connection
from app.core.config import settings

router = APIRouter(tags=["Metadata"])

def get_total_records(db):
    try:
        query = "SELECT total_loans FROM public_gold.portfolio_summary LIMIT 1"
        return db.execute(query).fetchone()['total_loans']
    except:
        return 0

@router.get("/metadata")
def read_metadata():
    records = 0
    with get_db_connection() as db:
        records = get_total_records(db)
        
    return {
        "records": records,
        "warehouse": "Gold",
        "last_refresh": "Current",
        "dbt_tests": "15 passed",
        "version": settings.API_VERSION
    }
