from pydantic import BaseModel
from typing import Optional, List
from decimal import Decimal
from datetime import datetime


class KPICard(BaseModel):
    label: str
    value: str
    change_pct: Optional[float] = None
    change_label: Optional[str] = None
    trend: Optional[str] = None   # up, down, stable


class RecentActivity(BaseModel):
    time: str
    event: str
    module: str
    status: str   # success, warning, danger, neutral
    action: str


class AIAlert(BaseModel):
    id: str
    severity: str   # low, medium, high, critical
    title: str
    description: str
    module: str
    created_at: Optional[datetime] = None


class ChartDataPoint(BaseModel):
    label: str
    value: float


class HealthScoreDimension(BaseModel):
    name: str
    score: int


class DashboardStatsResponse(BaseModel):
    # KPI cards
    revenue_mtd: Decimal
    revenue_change_pct: float
    inventory_value: Decimal
    pending_payments: Decimal
    pending_invoice_count: int
    gst_alerts: int
    stock_alerts: int
    duplicate_invoices: int

    # Health score
    health_score: int
    health_grade: str    # A, B, C, D
    health_breakdown: List[HealthScoreDimension]

    # Recent activity
    recent_activity: List[RecentActivity]

    # AI alerts
    ai_alerts: List[AIAlert]

    # Charts
    revenue_trend: List[ChartDataPoint]
    inventory_trend: List[ChartDataPoint]
    payment_trend: List[ChartDataPoint]
