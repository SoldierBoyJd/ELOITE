from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID
from app.models.supplier import Supplier
from app.repositories.base import BaseRepository


class SupplierRepository(BaseRepository[Supplier]):
    def __init__(self, db: AsyncSession):
        super().__init__(Supplier, db)

    async def get_active(
        self, company_id: UUID, search: Optional[str] = None,
        skip: int = 0, limit: int = 20
    ) -> List[Supplier]:
        query = select(Supplier).where(
            and_(Supplier.company_id == company_id, Supplier.is_active == True)
        )
        if search:
            query = query.where(
                or_(
                    Supplier.name.ilike(f"%{search}%"),
                    Supplier.gst_number.ilike(f"%{search}%"),
                )
            )
        result = await self.db.execute(
            query.order_by(Supplier.name).offset(skip).limit(limit)
        )
        return list(result.scalars().all())
