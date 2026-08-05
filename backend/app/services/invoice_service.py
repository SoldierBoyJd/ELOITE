from typing import List, Optional
from uuid import UUID
from decimal import Decimal
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.invoice import InvoiceRepository
from app.schemas.invoice import InvoiceCreate, InvoiceUpdate, InvoiceResponse
from app.models.invoice import InvoiceItem


class InvoiceService:
    def __init__(self, db: AsyncSession):
        self.repo = InvoiceRepository(db)
        self.db = db

    async def list_invoices(self, company_id: UUID, skip: int = 0, limit: int = 50) -> List[InvoiceResponse]:
        invoices = await self.repo.get_all_with_items(company_id=company_id, skip=skip, limit=limit)
        return [InvoiceResponse.model_validate(inv) for inv in invoices]

    async def get_invoice(self, invoice_id: UUID, company_id: UUID) -> Optional[InvoiceResponse]:
        invoice = await self.repo.get_by_id_with_items(invoice_id, company_id=company_id)
        if not invoice:
            return None
        return InvoiceResponse.model_validate(invoice)

    async def create_invoice(self, company_id: UUID, data: InvoiceCreate) -> InvoiceResponse:
        items_data = data.items
        obj_data = data.model_dump(exclude={"items"})
        obj_data["company_id"] = company_id

        # Calculate totals
        subtotal = Decimal("0.00")
        gst_total = Decimal("0.00")
        
        for item in items_data:
            line_sub = item.quantity * item.unit_price - (item.discount or Decimal("0.00"))
            line_gst = line_sub * ((item.gst_rate or Decimal("18.00")) / Decimal("100.00"))
            subtotal += line_sub
            gst_total += line_gst

        obj_data["subtotal"] = subtotal
        obj_data["gst_amount"] = gst_total
        obj_data["total"] = subtotal + gst_total
        obj_data["amount_paid"] = Decimal("0.00")
        obj_data["status"] = "sent"

        invoice = await self.repo.create(obj_data)

        # Create items
        for item in items_data:
            line_sub = item.quantity * item.unit_price - (item.discount or Decimal("0.00"))
            line_gst = line_sub * ((item.gst_rate or Decimal("18.00")) / Decimal("100.00"))
            inv_item = InvoiceItem(
                invoice_id=invoice.id,
                product_id=item.product_id,
                description=item.description,
                quantity=item.quantity,
                unit_price=item.unit_price,
                gst_rate=item.gst_rate,
                gst_amount=line_gst,
                discount=item.discount,
                subtotal=line_sub,
            )
            self.db.add(inv_item)

        await self.db.commit()
        res = await self.repo.get_by_id_with_items(invoice.id, company_id=company_id)
        return InvoiceResponse.model_validate(res)
