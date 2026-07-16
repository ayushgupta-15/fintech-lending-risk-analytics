from app.repositories.policy_repository import PolicyRepository
from app.services.recommendation_engine import RecommendationEngine
from app.schemas.policy import PolicySimulationResponse

class SimulationService:
    def __init__(self, repo: PolicyRepository, rec_engine: RecommendationEngine):
        self.repo = repo
        self.rec_engine = rec_engine

    def simulate(self, min_grade: str, max_dti: float, min_income: float, max_loan: float) -> PolicySimulationResponse:
        total_loans = self.repo.get_total_loans()
        if total_loans == 0:
            total_loans = 1 # Avoid division by zero
            
        sim_result = self.repo.simulate_policy(min_grade, max_dti, min_income, max_loan)
        
        approved_count = sim_result['approved_count'] if sim_result and sim_result['approved_count'] else 0
        portfolio_value = sim_result['portfolio_value'] if sim_result and sim_result['portfolio_value'] else 0.0
        expected_loss = sim_result['expected_loss'] if sim_result and sim_result['expected_loss'] else 0.0
        expected_default = sim_result['expected_default'] if sim_result and sim_result['expected_default'] else 0.0
        
        approval_rate = (approved_count / total_loans) * 100
        
        rec = self.rec_engine.generate_recommendation(
            approval_rate=approval_rate,
            expected_default=expected_default,
            expected_loss=expected_loss,
            portfolio_value=portfolio_value
        )
        
        return PolicySimulationResponse(
            approval_rate=round(approval_rate, 2),
            expected_default=round(expected_default * 100, 2),
            portfolio_value=round(portfolio_value, 2),
            expected_loss=round(expected_loss, 2),
            recommendation=rec["recommendation"]
        )
