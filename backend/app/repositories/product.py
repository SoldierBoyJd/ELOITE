from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.product import Product, Category
from app.repositories.base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    def __init__(self, db: AsyncSession):
        super().__init__(Product, db)

    async def get_by_sku(self, sku: str, company_id: UUID) -> Optional[Product]:
        stmt = select(Product).where(Product.company_id == company_id, Product.sku == sku)
        res = await self.db.execute(stmt)
        return res.scalars().first()


class CategoryRepository(BaseRepository[Category]):
    def __init__(self, db: AsyncSession):
        super().__init__(Category, db)
