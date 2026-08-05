from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from datetime import datetime


class InventoryResponse(BaseModel):
    id: UUID
    warehouse_id: UUID
    product_id: UUID
    quantity: int
    reserved_quantity: int
    damaged_quantity: int
    updated_at: datetime

    model_config = {"from_attributes": True}


class StockMovementCreate(BaseModel):
    product_id: UUID
    warehouse_id: UUID
    type: str  # IN, OUT, RETURN, TRANSFER, ADJUSTMENT
    quantity: int
    reference_type: Optional[str] = None
    reference_id: Optional[UUID] = None
    notes: Optional[str] = None


class StockMovementResponse(StockMovementCreate):
    id: UUID
    company_id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}
