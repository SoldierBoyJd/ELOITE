from pydantic import BaseModel
from typing import Optional
from uuid import UUID
from decimal import Decimal
from datetime import date, datetime


class PaymentCreate(BaseModel):
    invoice_id: UUID
    payment_number: str
    amount: Decimal
    payment_date: date
    payment_mode: str  # cash, bank_transfer, upi, cheque, card
    reference_number: Optional[str] = None
    notes: Optional[str] = None


class PaymentResponse(PaymentCreate):
    id: UUID
    company_id: UUID
    created_at: datetime

    model_config = {"from_attributes": True}
