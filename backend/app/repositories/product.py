from sqlalchemy import select, and_, or_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import List, Optional
from uuid import UUID
from app.models.product import Product, Category
from app.repositories.base import BaseRepository


class ProductRepository(BaseRepository[Product]):
    def __init__(self, db: AsyncSession):
        super().__init__(Product, db)

    async def get_with_category(self, id: UUID, company_id: UUID) -> Optional[Product]:
        result = await self.db.execute(
            select(Product)
            .options(selectinload(Product.category))
            .where(and_(Product.id == id, Product.company_id == company_id))
        )
        return result.scalar_one_or_none()

    async def get_multi_with_category(
        self, company_id: UUID, skip: int = 0, limit: int = 20,
        category_id: Optional[UUID] = None, search: Optional[str] = None,
        is_active: bool = True
    ) -> List[Product]:
        query = (
            select(Product)
            .options(selectinload(Product.category))
            .where(and_(Product.company_id == company_id, Product.is_active == is_active))
        )
        if category_id:
            query = query.where(Product.category_id == category_id)
        if search:
            query = query.where(
                or_(
                    Product.name.ilike(f"%{search}%"),
                    Product.sku.ilike(f"%{search}%"),
                    Product.barcode.ilike(f"%{search}%"),
                )
            )
        query = query.order_by(Product.name).offset(skip).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def get_by_sku(self, company_id: UUID, sku: str) -> Optional[Product]:
        result = await self.db.execute(
            select(Product).where(
                and_(Product.company_id == company_id, Product.sku == sku)
            )
        )
        return result.scalar_one_or_none()

    async def get_categories(self, company_id: UUID) -> List[Category]:
        result = await self.db.execute(
            select(Category).where(Category.company_id == company_id).order_by(Category.name)
        )
        return list(result.scalars().all())
