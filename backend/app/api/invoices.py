from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.services.invoice_service import InvoiceService
from app.schemas.invoice import InvoiceCreate, InvoiceResponse

router = APIRouter(prefix="/invoices", tags=["Invoices"])


@router.get("", response_model=List[InvoiceResponse])
async def list_invoices(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.INVOICES_READ)),
):
    service = InvoiceService(db)
    return await service.list_invoices(UUID(company_id), skip=pagination["skip"], limit=pagination["limit"])


@router.post("", response_model=InvoiceResponse, status_code=status.HTTP_201_CREATED)
async def create_invoice(
    data: InvoiceCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.INVOICES_WRITE)),
):
    service = InvoiceService(db)
    return await service.create_invoice(UUID(company_id), data)


@router.get("/{invoice_id}", response_model=InvoiceResponse)
async def get_invoice(
    invoice_id: UUID,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.INVOICES_READ)),
):
    service = InvoiceService(db)
    invoice = await service.get_invoice(invoice_id, UUID(company_id))
    if not invoice:
        raise HTTPException(status_code=404, detail="Invoice not found")
    return invoice
