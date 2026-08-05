from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID
from datetime import date
from app.models.payment import Payment
from app.models.invoice import Invoice


class PaymentRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_multi(
        self, company_id: UUID, skip: int = 0, limit: int = 20
    ) -> List[Payment]:
        result = await self.db.execute(
            select(Payment)
            .where(Payment.company_id == company_id)
            .order_by(Payment.payment_date.desc())
            .offset(skip).limit(limit)
        )
        return list(result.scalars().all())

    async def create(self, data: dict) -> Payment:
        payment = Payment(**data)
        self.db.add(payment)
        # Update invoice amount_paid
        invoice = await self.db.get(Invoice, data["invoice_id"])
        if invoice:
            invoice.amount_paid = float(invoice.amount_paid or 0) + float(data["amount"])
            if float(invoice.amount_paid) >= float(invoice.total):
                invoice.status = "paid"
            else:
                invoice.status = "partial"
        await self.db.flush()
        await self.db.refresh(payment)
        return payment

    async def get_total_paid_mtd(self, company_id: UUID) -> float:
        from_date = date.today().replace(day=1)
        result = await self.db.execute(
            select(func.sum(Payment.amount))
            .where(
                and_(
                    Payment.company_id == company_id,
                    Payment.status == "completed",
                    Payment.payment_date >= from_date,
                )
            )
        )
        return float(result.scalar_one() or 0)

    async def get_outstanding_invoices(self, company_id: UUID) -> List[dict]:
        today = date.today()
        result = await self.db.execute(
            select(
                Invoice.id,
                Invoice.invoice_number,
                Invoice.invoice_date,
                Invoice.due_date,
                Invoice.total,
                Invoice.amount_paid,
                Invoice.status,
                Invoice.type,
            )
            .where(
                and_(
                    Invoice.company_id == company_id,
                    Invoice.status.in_(["sent", "partial", "overdue"]),
                    Invoice.total > Invoice.amount_paid,
                )
            )
            .order_by(Invoice.due_date.asc())
        )
        rows = result.all()
        out = []
        for r in rows:
            days_overdue = (today - r.due_date).days if r.due_date else 0
            out.append({
                "invoice_id": r.id,
                "invoice_number": r.invoice_number,
                "invoice_date": r.invoice_date,
                "due_date": r.due_date,
                "total": float(r.total),
                "amount_paid": float(r.amount_paid or 0),
                "outstanding": float(r.total) - float(r.amount_paid or 0),
                "days_overdue": max(0, days_overdue),
                "status": r.status,
            })
        return out
