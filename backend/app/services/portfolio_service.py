from app.repositories.portfolio_repository import PortfolioRepository

class PortfolioService:
    def __init__(self, repo: PortfolioRepository):
        self.repo = repo

    def get_portfolio_summary(self):
        summary = self.repo.get_summary()
        return summary
