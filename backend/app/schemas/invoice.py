from pydantic import BaseModel, ConfigDict
from typing import Optional, List
from decimal import Decimal
from datetime import date, datetime
import uuid


class InvoiceItemBase(BaseModel):
    product_id: Optional[uuid.UUID] = None
    description: Optional[str] = None
    quantity: Decimal
    unit_price: Decimal
    gst_rate: Optional[Decimal] = None
    discount: Decimal = Decimal("0")


class InvoiceItemCreate(InvoiceItemBase):
    pass


class InvoiceItemResponse(InvoiceItemBase):
    id: uuid.UUID
    gst_amount: Optional[Decimal]
    subtotal: Decimal
    model_config = ConfigDict(from_attributes=True)


class InvoiceBase(BaseModel):
    invoice_number: str
    type: str                         # SALE, PURCHASE, RETURN
    invoice_date: date
    due_date: Optional[date] = None
    supplier_id: Optional[uuid.UUID] = None
    customer_id: Optional[uuid.UUID] = None
    discount: Decimal = Decimal("0")
    notes: Optional[str] = None


class InvoiceCreate(InvoiceBase):
    items: List[InvoiceItemCreate]


class InvoiceUpdate(BaseModel):
    status: Optional[str] = None
    due_date: Optional[date] = None
    notes: Optional[str] = None
    eway_bill_number: Optional[str] = None


class InvoiceResponse(InvoiceBase):
    id: uuid.UUID
    company_id: uuid.UUID
    subtotal: Decimal
    gst_amount: Decimal
    total: Decimal
    amount_paid: Decimal
    status: str
    eway_bill_number: Optional[str]
    eway_status: Optional[str]
    items: List[InvoiceItemResponse] = []
    created_at: datetime
    updated_at: datetime
    customer_name: Optional[str] = None
    supplier_name: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class AgingBucket(BaseModel):
    label: str           # "0-30", "31-60", "61-90", "90+"
    count: int
    amount: Decimal


class AgingReport(BaseModel):
    buckets: List[AgingBucket]
    total_outstanding: Decimal
    total_overdue: Decimal
