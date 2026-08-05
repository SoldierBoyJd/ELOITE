from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.repositories.payment import PaymentRepository
from app.repositories.invoice import InvoiceRepository
from app.schemas.payment import PaymentCreate, PaymentResponse

router = APIRouter(prefix="/payments", tags=["Payments"])


@router.get("", response_model=List[PaymentResponse])
async def list_payments(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PAYMENTS_READ)),
):
    repo = PaymentRepository(db)
    payments = await repo.get_all(company_id=UUID(company_id), skip=pagination["skip"], limit=pagination["limit"])
    return [PaymentResponse.model_validate(p) for p in payments]


@router.post("", response_model=PaymentResponse, status_code=status.HTTP_201_CREATED)
async def create_payment(
    data: PaymentCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PAYMENTS_WRITE)),
):
    repo = PaymentRepository(db)
    inv_repo = InvoiceRepository(db)

    # 1. Save payment
    obj_data = data.model_dump()
    obj_data["company_id"] = UUID(company_id)
    payment = await repo.create(obj_data)

    # 2. Update invoice amount_paid & status
    invoice = await inv_repo.get_by_id(data.invoice_id, company_id=UUID(company_id))
    if invoice:
        new_paid = float(invoice.amount_paid or 0) + float(data.amount)
        tot = float(invoice.total or 0)
        new_status = "paid" if new_paid >= tot else "partial"
        await inv_repo.update(invoice.id, {"amount_paid": new_paid, "status": new_status})

    return PaymentResponse.model_validate(payment)
