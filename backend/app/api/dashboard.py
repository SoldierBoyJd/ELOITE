from fastapi import APIRouter, Depends
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id
from app.services.dashboard_service import DashboardService
from app.schemas.dashboard import DashboardStatsResponse

router = APIRouter(prefix="/dashboard", tags=["Dashboard"])


@router.get("/stats", response_model=DashboardStatsResponse)
async def get_dashboard_stats(
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db)
):
    service = DashboardService(db)
    return await service.get_dashboard_stats(UUID(company_id))
