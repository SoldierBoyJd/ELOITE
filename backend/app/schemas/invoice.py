from pydantic import BaseModel
from typing import Optional, List
from uuid import UUID
from decimal import Decimal
from datetime import date, datetime


class InvoiceItemBase(BaseModel):
    product_id: Optional[UUID] = None
    description: Optional[str] = None
    quantity: Decimal
    unit_price: Decimal
    gst_rate: Optional[Decimal] = Decimal("18.00")
    discount: Optional[Decimal] = Decimal("0.00")


class InvoiceItemCreate(InvoiceItemBase):
    pass


class InvoiceItemResponse(InvoiceItemBase):
    id: UUID
    invoice_id: UUID
    gst_amount: Optional[Decimal] = Decimal("0.00")
    subtotal: Decimal

    model_config = {"from_attributes": True}


class InvoiceBase(BaseModel):
    invoice_number: str
    type: str  # SALE, PURCHASE, RETURN
    supplier_id: Optional[UUID] = None
    customer_id: Optional[UUID] = None
    invoice_date: date
    due_date: Optional[date] = None
    notes: Optional[str] = None
    eway_bill_number: Optional[str] = None


class InvoiceCreate(InvoiceBase):
    items: List[InvoiceItemCreate] = []


class InvoiceUpdate(BaseModel):
    invoice_number: Optional[str] = None
    supplier_id: Optional[UUID] = None
    customer_id: Optional[UUID] = None
    due_date: Optional[date] = None
    status: Optional[str] = None
    notes: Optional[str] = None
    eway_bill_number: Optional[str] = None


class InvoiceResponse(InvoiceBase):
    id: UUID
    company_id: UUID
    subtotal: Decimal
    discount: Decimal
    gst_amount: Decimal
    total: Decimal
    amount_paid: Decimal
    status: str
    created_at: datetime
    updated_at: datetime
    items: List[InvoiceItemResponse] = []

    model_config = {"from_attributes": True}
