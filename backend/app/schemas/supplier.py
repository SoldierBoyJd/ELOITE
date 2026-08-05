from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from decimal import Decimal
from datetime import datetime


class SupplierBase(BaseModel):
    name: str
    gst_number: Optional[str] = None
    phone: Optional[str] = None
    email: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    payment_terms: Optional[int] = 30
    credit_limit: Optional[Decimal] = None


class SupplierCreate(SupplierBase):
    pass


class SupplierResponse(SupplierBase):
    id: UUID
    company_id: UUID
    is_active: bool
    created_at: datetime

    model_config = {"from_attributes": True}
