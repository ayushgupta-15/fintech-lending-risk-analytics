class RecommendationEngine:
    @staticmethod
    def generate_recommendation(approval_rate: float, expected_default: float, expected_loss: float, portfolio_value: float):
        if approval_rate < 0:
            return {"risk_level": "Unknown", "summary": "Invalid input", "recommendation": "Check input parameters", "confidence": "Low"}
            
        if expected_default > 0.05:
            return {
                "risk_level": "High",
                "summary": "Expected default rate exceeds 5% threshold.",
                "recommendation": "Tighten policy. Decrease maximum DTI or require higher minimum grades.",
                "confidence": "High"
            }
        elif approval_rate < 20.0:
            return {
                "risk_level": "Low",
                "summary": "Approval rate is very low, but risk is contained.",
                "recommendation": "Consider relaxing policy to capture more market share.",
                "confidence": "Medium"
            }
        else:
            return {
                "risk_level": "Balanced",
                "summary": "Policy yields a balanced risk/reward profile.",
                "recommendation": "Maintain current policy parameters.",
                "confidence": "High"
            }
