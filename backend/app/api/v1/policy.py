from fastapi import APIRouter, Depends
from app.core.database import get_db_connection
from app.repositories.policy_repository import PolicyRepository
from app.services.recommendation_engine import RecommendationEngine
from app.services.simulation_service import SimulationService
from app.schemas.policy import PolicySimulationRequest, PolicySimulationResponse
from app.schemas.common import APIResponse, create_response

router = APIRouter(tags=["Simulation"])

def get_simulation_service():
    with get_db_connection() as db:
        repo = PolicyRepository(db)
        engine = RecommendationEngine()
        yield SimulationService(repo, engine)

@router.post("/simulate", response_model=APIResponse[PolicySimulationResponse])
def simulate_policy(request: PolicySimulationRequest, service: SimulationService = Depends(get_simulation_service)):
    data = service.simulate(
        min_grade=request.min_grade,
        max_dti=request.max_dti,
        min_income=request.min_income,
        max_loan=request.max_loan
    )
    return create_response(data=data, source="public_gold.policy_engine (dynamic)")
