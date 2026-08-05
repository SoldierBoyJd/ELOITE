from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.dashboard import DashboardRepository
from app.schemas.dashboard import DashboardStatsResponse


class DashboardService:
    def __init__(self, db: AsyncSession):
        self.repo = DashboardRepository(db)

    async def get_dashboard_stats(self, company_id: UUID) -> DashboardStatsResponse:
        raw_stats = await self.repo.get_stats_for_company(company_id)
        return DashboardStatsResponse(**raw_stats)
