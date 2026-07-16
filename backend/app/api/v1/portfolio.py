from fastapi import APIRouter, Depends
from app.core.database import get_db_connection
from app.repositories.portfolio_repository import PortfolioRepository
from app.services.portfolio_service import PortfolioService
from app.schemas.common import APIResponse, create_response

router = APIRouter(tags=["Portfolio"])

def get_portfolio_service():
    with get_db_connection() as db:
        repo = PortfolioRepository(db)
        yield PortfolioService(repo)

@router.get("/summary", response_model=APIResponse)
def get_portfolio_summary(service: PortfolioService = Depends(get_portfolio_service)):
    data = service.get_portfolio_summary()
    return create_response(data=data, source="public_gold.portfolio_summary")
