from psycopg import Connection

class PolicyRepository:
    def __init__(self, db: Connection):
        self.db = db
        
    def get_total_loans(self):
        query = "SELECT COUNT(*) as count FROM public_gold.policy_engine"
        result = self.db.execute(query).fetchone()
        return result['count'] if result else 0

    def simulate_policy(self, min_grade: str, max_dti: float, min_income: float, max_loan: float):
        # Grade logic in strings: A < B < C. We want min_grade or better. 
        # So grade <= min_grade. E.g. 'A' <= 'B' is true. 'C' <= 'B' is false.
        query = """
            SELECT 
                count(*) as approved_count,
                sum(loan_amount) as portfolio_value,
                avg(risk_score) as avg_risk_score,
                sum(segment_expected_loss) as expected_loss,
                avg(cast(default_flag as float)) as expected_default
            FROM public_gold.policy_engine
            WHERE grade <= %(min_grade)s
              AND debt_to_income <= %(max_dti)s
              AND annual_income >= %(min_income)s
              AND loan_amount <= %(max_loan)s
        """
        params = {
            "min_grade": min_grade,
            "max_dti": max_dti,
            "min_income": min_income,
            "max_loan": max_loan
        }
        return self.db.execute(query, params).fetchone()
