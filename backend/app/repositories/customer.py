from sqlalchemy import select, and_, or_
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from uuid import UUID
from app.models.customer import Customer
from app.repositories.base import BaseRepository


class CustomerRepository(BaseRepository[Customer]):
    def __init__(self, db: AsyncSession):
        super().__init__(Customer, db)

    async def get_active(
        self, company_id: UUID, search: Optional[str] = None,
        skip: int = 0, limit: int = 20
    ) -> List[Customer]:
        query = select(Customer).where(
            and_(Customer.company_id == company_id, Customer.is_active == True)
        )
        if search:
            query = query.where(
                or_(
                    Customer.name.ilike(f"%{search}%"),
                    Customer.gst_number.ilike(f"%{search}%"),
                    Customer.phone.ilike(f"%{search}%"),
                )
            )
        result = await self.db.execute(
            query.order_by(Customer.name).offset(skip).limit(limit)
        )
        return list(result.scalars().all())
