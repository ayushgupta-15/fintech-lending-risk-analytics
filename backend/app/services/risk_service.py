from app.repositories.risk_repository import RiskRepository

class RiskService:
    def __init__(self, repo: RiskRepository):
        self.repo = repo

    def get_all_segments(self):
        return self.repo.get_segments()

    def get_grades_summary(self):
        return self.repo.get_grades()

    def get_dti_summary(self):
        return self.repo.get_dti_segments()
