from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from datetime import date, timedelta
from app.models.invoice import Invoice
from app.models.inventory import Inventory
from app.models.product import Product
from app.models.payment import Payment


class DashboardRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_revenue_mtd(self, company_id: UUID) -> float:
        from_date = date.today().replace(day=1)
        result = await self.db.execute(
            select(func.sum(Invoice.total))
            .where(and_(
                Invoice.company_id == company_id,
                Invoice.type == "SALE",
                Invoice.status.in_(["paid", "partial"]),
                Invoice.invoice_date >= from_date,
            ))
        )
        return float(result.scalar_one() or 0)

    async def get_revenue_previous_month(self, company_id: UUID) -> float:
        today = date.today()
        first_this = today.replace(day=1)
        last_prev = first_this - timedelta(days=1)
        first_prev = last_prev.replace(day=1)
        result = await self.db.execute(
            select(func.sum(Invoice.total))
            .where(and_(
                Invoice.company_id == company_id,
                Invoice.type == "SALE",
                Invoice.status.in_(["paid", "partial"]),
                Invoice.invoice_date >= first_prev,
                Invoice.invoice_date <= last_prev,
            ))
        )
        return float(result.scalar_one() or 0)

    async def get_inventory_value(self, company_id: UUID) -> float:
        result = await self.db.execute(
            select(func.sum(Inventory.quantity * Product.cost_price))
            .join(Product, Inventory.product_id == Product.id)
            .where(Product.company_id == company_id)
        )
        return float(result.scalar_one() or 0)

    async def get_pending_payments(self, company_id: UUID) -> dict:
        result = await self.db.execute(
            select(
                func.sum(Invoice.total - Invoice.amount_paid).label("amount"),
                func.count(Invoice.id).label("count"),
            )
            .where(and_(
                Invoice.company_id == company_id,
                Invoice.status.in_(["sent", "partial", "overdue"]),
                Invoice.total > Invoice.amount_paid,
            ))
        )
        row = result.one()
        return {"amount": float(row.amount or 0), "count": int(row.count or 0)}

    async def get_stock_alerts_count(self, company_id: UUID) -> int:
        result = await self.db.execute(
            select(func.count(Inventory.id))
            .join(Product, Inventory.product_id == Product.id)
            .where(and_(
                Product.company_id == company_id,
                Inventory.quantity <= Product.minimum_stock,
                Product.is_active == True,
            ))
        )
        return int(result.scalar_one() or 0)

    async def get_recent_invoices(self, company_id: UUID, limit: int = 6) -> list:
        result = await self.db.execute(
            select(Invoice)
            .where(Invoice.company_id == company_id)
            .order_by(Invoice.created_at.desc())
            .limit(limit)
        )
        return list(result.scalars().all())
