from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel
from typing import Optional, Dict, Any, List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.dependencies import get_db, get_company_id
from app.core.permissions import require_permission, Permission
from app.intelligence.llm.chatbot import ask_copilot
from app.intelligence.ml.inference.demand import predict_demand
from app.intelligence.ml.inference.fraud import detect_invoice_anomaly
from app.intelligence.rules.business_score import calculate_business_health_score
from app.repositories.dashboard import DashboardRepository

router = APIRouter(prefix="/ai", tags=["AI & Intelligence"])


class CopilotRequest(BaseModel):
    query: str
    context: Optional[Dict[str, Any]] = None


class FraudCheckRequest(BaseModel):
    invoice_amount: float
    historical_amounts: List[float] = []
    is_duplicate: bool = False


@router.post("/copilot")
async def copilot_chat(
    req: CopilotRequest,
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.AI_READ)),
):
    answer = await ask_copilot(req.query, req.context)
    return {"query": req.query, "answer": answer}


@router.get("/predict-demand")
async def get_demand_forecast(
    product_id: Optional[UUID] = None,
    forecast_days: int = 14,
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.AI_READ)),
):
    # Simulated sales series for calculation
    dummy_history = [12.0, 14.5, 13.0, 16.2, 18.0, 19.5, 21.0, 22.4]
    result = predict_demand(dummy_history, forecast_days=forecast_days)
    return {"product_id": product_id, "forecast": result}


@router.post("/fraud-check")
async def check_invoice_fraud(
    req: FraudCheckRequest,
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.AI_READ)),
):
    res = detect_invoice_anomaly(req.invoice_amount, req.historical_amounts, req.is_duplicate)
    return res


@router.get("/health-score")
async def get_health_score(
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.AI_READ)),
):
    repo = DashboardRepository(db)
    raw_stats = await repo.get_stats_for_company(UUID(company_id))
    health = calculate_business_health_score(raw_stats)
    return health
