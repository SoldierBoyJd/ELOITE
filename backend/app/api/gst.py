from fastapi import APIRouter, Depends, Query
from typing import Optional
from app.core.dependencies import get_company_id
from app.core.permissions import require_permission, Permission
from app.intelligence.rules.gst_rules import validate_gstin, validate_hsn_gst_rate, calculate_gst_deadlines

router = APIRouter(prefix="/gst", tags=["GST Compliance"])


@router.get("/deadlines")
async def get_deadlines(
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.GST_READ)),
):
    return {"deadlines": calculate_gst_deadlines()}


@router.get("/validate-gstin")
async def validate_gstin_endpoint(
    gstin: str = Query(..., description="15-character GSTIN to validate"),
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.GST_READ)),
):
    return validate_gstin(gstin)


@router.get("/validate-hsn")
async def validate_hsn_endpoint(
    hsn: str,
    gst_rate: float,
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.GST_READ)),
):
    return validate_hsn_gst_rate(hsn, gst_rate)
