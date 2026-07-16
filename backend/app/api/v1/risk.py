from fastapi import APIRouter, Depends
from app.core.database import get_db_connection
from app.repositories.risk_repository import RiskRepository
from app.services.risk_service import RiskService
from app.schemas.common import APIResponse, create_response

router = APIRouter(tags=["Risk"])

def get_risk_service():
    with get_db_connection() as db:
        repo = RiskRepository(db)
        yield RiskService(repo)

@router.get("/segments", response_model=APIResponse)
def get_risk_segments(service: RiskService = Depends(get_risk_service)):
    data = service.get_all_segments()
    return create_response(data=data, source="public_gold.risk_engine")

@router.get("/grades", response_model=APIResponse)
def get_risk_grades(service: RiskService = Depends(get_risk_service)):
    data = service.get_grades_summary()
    return create_response(data=data, source="public_gold.risk_engine (aggregated by grade)")

@router.get("/dti", response_model=APIResponse)
def get_risk_dti(service: RiskService = Depends(get_risk_service)):
    data = service.get_dti_summary()
    return create_response(data=data, source="public_gold.risk_engine (aggregated by dti_band)")
