from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.repositories.product import ProductRepository, CategoryRepository
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse


class ProductService:
    def __init__(self, db: AsyncSession):
        self.repo = ProductRepository(db)
        self.cat_repo = CategoryRepository(db)

    async def list_products(self, company_id: UUID, skip: int = 0, limit: int = 50) -> List[ProductResponse]:
        products = await self.repo.get_all(company_id=company_id, skip=skip, limit=limit)
        return [ProductResponse.model_validate(p) for p in products]

    async def get_product(self, product_id: UUID, company_id: UUID) -> Optional[ProductResponse]:
        product = await self.repo.get_by_id(product_id, company_id=company_id)
        if not product:
            return None
        return ProductResponse.model_validate(product)

    async def create_product(self, company_id: UUID, data: ProductCreate) -> ProductResponse:
        obj_data = data.model_dump()
        obj_data["company_id"] = company_id
        product = await self.repo.create(obj_data)
        return ProductResponse.model_validate(product)

    async def update_product(self, product_id: UUID, company_id: UUID, data: ProductUpdate) -> Optional[ProductResponse]:
        updated = await self.repo.update(product_id, data.model_dump(exclude_unset=True), company_id=company_id)
        if not updated:
            return None
        return ProductResponse.model_validate(updated)

    async def delete_product(self, product_id: UUID, company_id: UUID) -> bool:
        return await self.repo.delete(product_id, company_id=company_id)
