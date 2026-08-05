from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from decimal import Decimal
from datetime import datetime
import uuid


class InventoryResponse(BaseModel):
    id: uuid.UUID
    warehouse_id: uuid.UUID
    product_id: uuid.UUID
    quantity: int
    reserved_quantity: int
    damaged_quantity: int
    available_quantity: int = 0
    product_name: Optional[str] = None
    product_sku: Optional[str] = None
    minimum_stock: Optional[int] = None
    is_low_stock: bool = False
    model_config = ConfigDict(from_attributes=True)


class StockAdjustRequest(BaseModel):
    warehouse_id: uuid.UUID
    product_id: uuid.UUID
    quantity_change: int          # positive = add, negative = remove
    movement_type: str            # IN, OUT, ADJUSTMENT, RETURN
    notes: Optional[str] = None
    reference_id: Optional[uuid.UUID] = None
    reference_type: Optional[str] = None


class StockMovementResponse(BaseModel):
    id: uuid.UUID
    product_id: uuid.UUID
    warehouse_id: uuid.UUID
    type: str
    quantity: int
    reference_type: Optional[str]
    notes: Optional[str]
    created_at: datetime
    model_config = ConfigDict(from_attributes=True)


class LowStockItem(BaseModel):
    product_id: uuid.UUID
    product_name: str
    sku: Optional[str]
    warehouse_id: uuid.UUID
    warehouse_name: str
    current_quantity: int
    minimum_stock: int
    shortage: int
    days_until_stockout: Optional[int] = None


class ReorderRecommendation(BaseModel):
    product_id: uuid.UUID
    product_name: str
    sku: Optional[str]
    current_stock: int
    reorder_point: int
    suggested_qty: int
    supplier_id: Optional[uuid.UUID]
    supplier_name: Optional[str]
    estimated_cost: Optional[Decimal]
    urgency: str   # critical, high, medium, low
    confidence: float
