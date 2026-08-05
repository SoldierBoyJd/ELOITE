from pydantic import BaseModel
from typing import List, Optional
from decimal import Decimal


class SparkPoint(BaseModel):
    v: float


class HealthDimension(BaseModel):
    dim: str
    score: int


class ActivityItem(BaseModel):
    id: str
    time: str
    event: str
    module: str
    status: str  # success, warning, danger, neutral
    action: str


class DashboardStatsResponse(BaseModel):
    monthly_revenue: Decimal
    revenue_growth_pct: float
    inventory_items_count: int
    low_stock_count: int
    overdue_payments_total: Decimal
    pending_invoices_count: int
    business_health_score: int
    revenue_sparkline: List[SparkPoint]
    inventory_sparkline: List[SparkPoint]
    payments_sparkline: List[SparkPoint]
    health_dimensions: List[HealthDimension]
    recent_activity: List[ActivityItem]
