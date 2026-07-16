from pydantic import BaseModel, Field
from typing import Optional

class PolicySimulationRequest(BaseModel):
    min_grade: str = Field(..., description="Minimum acceptable credit grade (e.g., 'B')")
    max_dti: float = Field(..., description="Maximum acceptable DTI percentage")
    min_income: float = Field(..., description="Minimum annual income requirement")
    max_loan: float = Field(..., description="Maximum loan size allowed")

class PolicySimulationResponse(BaseModel):
    approval_rate: float
    expected_default: float
    portfolio_value: float
    expected_loss: float
    recommendation: str
