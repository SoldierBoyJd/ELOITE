from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.repositories.dashboard import DashboardRepository
from app.schemas.dashboard import (
    DashboardStatsResponse, HealthScoreDimension, RecentActivity, AIAlert, ChartDataPoint
)


class DashboardService:
    def __init__(self, db: AsyncSession):
        self.repo = DashboardRepository(db)

    async def get_dashboard_stats(self, company_id: UUID) -> DashboardStatsResponse:
        # Fetch real data concurrently
        revenue_mtd     = await self.repo.get_revenue_mtd(company_id)
        revenue_last    = await self.repo.get_revenue_last_month(company_id)
        inventory_value = await self.repo.get_inventory_value(company_id)
        pending, p_count = await self.repo.get_pending_payments_total(company_id)
        low_stock_count = await self.repo.get_low_stock_count(company_id)
        overdue_count   = await self.repo.get_overdue_invoice_count(company_id)
        revenue_trend   = await self.repo.get_revenue_trend(company_id, days=30)

        # Revenue change %
        if revenue_last > 0:
            revenue_change = round(((revenue_mtd - revenue_last) / revenue_last) * 100, 1)
        else:
            revenue_change = 0.0

        # Simple health score calculation
        health_score, breakdown = self._calculate_health_score(
            revenue_change=revenue_change,
            low_stock_count=low_stock_count,
            overdue_count=overdue_count,
            pending=pending,
        )

        if health_score >= 85:
            grade = "A"
        elif health_score >= 70:
            grade = "B"
        elif health_score >= 55:
            grade = "C"
        else:
            grade = "D"

        return DashboardStatsResponse(
            revenue_mtd=revenue_mtd,
            revenue_change_pct=revenue_change,
            inventory_value=inventory_value,
            pending_payments=pending,
            pending_invoice_count=p_count,
            gst_alerts=0,          # will be populated when GST module is active
            stock_alerts=low_stock_count,
            duplicate_invoices=0,  # will be populated by AI duplicate detection
            health_score=health_score,
            health_grade=grade,
            health_breakdown=breakdown,
            recent_activity=[],    # populated by activity log when available
            ai_alerts=[],          # populated by AI engine
            revenue_trend=[ChartDataPoint(**p) for p in revenue_trend],
            inventory_trend=[],
            payment_trend=[],
        )

    def _calculate_health_score(
        self,
        revenue_change: float,
        low_stock_count: int,
        overdue_count: int,
        pending: float,
    ) -> tuple:
        # Revenue momentum (20 pts)
        rev_score = min(20, max(0, 10 + int(revenue_change / 2)))
        # Inventory health (20 pts)
        inv_score = max(0, 20 - low_stock_count * 3)
        # Payment reliability (20 pts)
        pay_score = max(0, 20 - overdue_count * 2)
        # Cash flow (20 pts) — based on pending relative to some baseline
        cash_score = 16 if pending < 500000 else 12
        # Compliance placeholder (20 pts)
        comp_score = 18

        total = rev_score + inv_score + pay_score + cash_score + comp_score
        breakdown = [
            HealthScoreDimension(name="Revenue Momentum",   score=rev_score * 5),
            HealthScoreDimension(name="Inventory Health",   score=inv_score * 5),
            HealthScoreDimension(name="Payment Reliability",score=pay_score * 5),
            HealthScoreDimension(name="Cash Flow",          score=cash_score * 5),
            HealthScoreDimension(name="Compliance",         score=comp_score * 5),
        ]
        return total, breakdown
