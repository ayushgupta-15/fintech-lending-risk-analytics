from psycopg import Connection

class PortfolioRepository:
    def __init__(self, db: Connection):
        self.db = db

    def get_summary(self):
        query = "SELECT * FROM public_gold.portfolio_summary LIMIT 1"
        result = self.db.execute(query).fetchone()
        return result
