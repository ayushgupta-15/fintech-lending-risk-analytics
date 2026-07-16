from psycopg import Connection

class RiskRepository:
    def __init__(self, db: Connection):
        self.db = db

    def get_segments(self):
        query = "SELECT * FROM public_gold.risk_engine"
        return self.db.execute(query).fetchall()

    def get_grades(self):
        query = """
            SELECT grade, sum(loan_count) as loan_count, 
                   sum(funded_amount) as funded_amount, 
                   avg(default_rate) as avg_default_rate 
            FROM public_gold.risk_engine 
            GROUP BY grade 
            ORDER BY grade
        """
        return self.db.execute(query).fetchall()

    def get_dti_segments(self):
        query = """
            SELECT dti_band, sum(loan_count) as loan_count, 
                   sum(funded_amount) as funded_amount, 
                   avg(default_rate) as avg_default_rate 
            FROM public_gold.risk_engine 
            GROUP BY dti_band
        """
        return self.db.execute(query).fetchall()
