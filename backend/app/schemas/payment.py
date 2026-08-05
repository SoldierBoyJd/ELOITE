from pydantic import BaseModel, ConfigDict
from typing import Optional
from decimal import Decimal
from datetime import date, datetime
import uuid


class PaymentBase(BaseModel):
    invoice_id: uuid.UUID
    amount: Decimal
    payment_date: date
    mode: str              # UPI, Bank, Cash, Cheque, NEFT, RTGS
    transaction_reference: Optional[str] = None
    bank_name: Optional[str] = None
    cheque_number: Optional[str] = None
    notes: Optional[str] = None


class PaymentCreate(PaymentBase):
    pass


class PaymentUpdate(BaseModel):
    status: Optional[str] = None
    transaction_reference: Optional[str] = None
    notes: Optional[str] = None


class PaymentResponse(PaymentBase):
    id: uuid.UUID
    company_id: uuid.UUID
    status: str
    created_at: datetime
    invoice_number: Optional[str] = None
    vendor_or_customer: Optional[str] = None
    model_config = ConfigDict(from_attributes=True)


class OutstandingInvoice(BaseModel):
    invoice_id: uuid.UUID
    invoice_number: str
    entity_name: str
    invoice_date: date
    due_date: Optional[date]
    total: Decimal
    amount_paid: Decimal
    outstanding: Decimal
    days_overdue: int
    status: str
