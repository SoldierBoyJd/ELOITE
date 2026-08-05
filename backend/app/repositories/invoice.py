from sqlalchemy import select, and_, func, case
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import List, Optional
from uuid import UUID
from datetime import date, timedelta
from app.models.invoice import Invoice, InvoiceItem
from app.models.customer import Customer
from app.models.supplier import Supplier


class InvoiceRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get(self, id: UUID, company_id: UUID) -> Optional[Invoice]:
        result = await self.db.execute(
            select(Invoice)
            .options(selectinload(Invoice.items), selectinload(Invoice.customer), selectinload(Invoice.supplier))
            .where(and_(Invoice.id == id, Invoice.company_id == company_id))
        )
        return result.scalar_one_or_none()

    async def get_multi(
        self,
        company_id: UUID,
        skip: int = 0,
        limit: int = 20,
        status: Optional[str] = None,
        invoice_type: Optional[str] = None,
        date_from: Optional[date] = None,
        date_to: Optional[date] = None,
    ) -> List[Invoice]:
        query = (
            select(Invoice)
            .options(selectinload(Invoice.customer), selectinload(Invoice.supplier))
            .where(Invoice.company_id == company_id)
        )
        if status:
            query = query.where(Invoice.status == status)
        if invoice_type:
            query = query.where(Invoice.type == invoice_type)
        if date_from:
            query = query.where(Invoice.invoice_date >= date_from)
        if date_to:
            query = query.where(Invoice.invoice_date <= date_to)
        query = query.order_by(Invoice.invoice_date.desc()).offset(skip).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def count(self, company_id: UUID, status: Optional[str] = None) -> int:
        query = select(func.count(Invoice.id)).where(Invoice.company_id == company_id)
        if status:
            query = query.where(Invoice.status == status)
        result = await self.db.execute(query)
        return result.scalar_one()

    async def create_with_items(self, invoice_data: dict, items_data: list) -> Invoice:
        invoice = Invoice(**invoice_data)
        self.db.add(invoice)
        await self.db.flush()
        for item_data in items_data:
            item = InvoiceItem(**item_data, invoice_id=invoice.id)
            self.db.add(item)
        await self.db.flush()
        await self.db.refresh(invoice)
        return invoice

    async def get_overdue(self, company_id: UUID) -> List[Invoice]:
        today = date.today()
        result = await self.db.execute(
            select(Invoice)
            .options(selectinload(Invoice.customer), selectinload(Invoice.supplier))
            .where(
                and_(
                    Invoice.company_id == company_id,
                    Invoice.due_date < today,
                    Invoice.status.in_(["sent", "partial", "overdue"]),
                )
            )
            .order_by(Invoice.due_date.asc())
        )
        return list(result.scalars().all())

    async def get_revenue_by_period(self, company_id: UUID, days: int = 30) -> List[dict]:
        from_date = date.today() - timedelta(days=days)
        result = await self.db.execute(
            select(
                Invoice.invoice_date,
                func.sum(Invoice.total).label("revenue"),
                func.count(Invoice.id).label("count"),
            )
            .where(
                and_(
                    Invoice.company_id == company_id,
                    Invoice.type == "SALE",
                    Invoice.status.in_(["paid", "partial"]),
                    Invoice.invoice_date >= from_date,
                )
            )
            .group_by(Invoice.invoice_date)
            .order_by(Invoice.invoice_date)
        )
        return [dict(row._mapping) for row in result.all()]

    async def get_total_revenue_mtd(self, company_id: UUID) -> float:
        today = date.today()
        from_date = today.replace(day=1)
        result = await self.db.execute(
            select(func.sum(Invoice.total))
            .where(
                and_(
                    Invoice.company_id == company_id,
                    Invoice.type == "SALE",
                    Invoice.status.in_(["paid", "partial"]),
                    Invoice.invoice_date >= from_date,
                )
            )
        )
        return float(result.scalar_one() or 0)

    async def get_aging_buckets(self, company_id: UUID) -> List[dict]:
        today = date.today()
        result = await self.db.execute(
            select(Invoice)
            .where(
                and_(
                    Invoice.company_id == company_id,
                    Invoice.type == "SALE",
                    Invoice.status.in_(["sent", "partial", "overdue"]),
                    Invoice.total > Invoice.amount_paid,
                )
            )
        )
        invoices = list(result.scalars().all())
        buckets = {"0-30": [], "31-60": [], "61-90": [], "90+": []}
        for inv in invoices:
            if inv.due_date:
                days_overdue = (today - inv.due_date).days
            else:
                days_overdue = 0
            outstanding = float(inv.total - inv.amount_paid)
            if days_overdue <= 30:
                buckets["0-30"].append(outstanding)
            elif days_overdue <= 60:
                buckets["31-60"].append(outstanding)
            elif days_overdue <= 90:
                buckets["61-90"].append(outstanding)
            else:
                buckets["90+"].append(outstanding)
        return [
            {"label": k, "count": len(v), "amount": sum(v)}
            for k, v in buckets.items()
        ]
