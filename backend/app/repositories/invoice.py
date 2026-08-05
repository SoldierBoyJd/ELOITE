from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload
from app.models.invoice import Invoice, InvoiceItem
from app.repositories.base import BaseRepository


class InvoiceRepository(BaseRepository[Invoice]):
    def __init__(self, db: AsyncSession):
        super().__init__(Invoice, db)

    async def get_by_id_with_items(self, id: UUID, company_id: Optional[UUID] = None) -> Optional[Invoice]:
        stmt = select(Invoice).options(selectinload(Invoice.items)).where(Invoice.id == id)
        if company_id:
            stmt = stmt.where(Invoice.company_id == company_id)
        res = await self.db.execute(stmt)
        return res.scalars().first()

    async def get_all_with_items(self, company_id: Optional[UUID] = None, skip: int = 0, limit: int = 50) -> List[Invoice]:
        stmt = select(Invoice).options(selectinload(Invoice.items))
        if company_id:
            stmt = stmt.where(Invoice.company_id == company_id)
        stmt = stmt.offset(skip).limit(limit).order_by(Invoice.created_at.desc())
        res = await self.db.execute(stmt)
        return list(res.scalars().all())
