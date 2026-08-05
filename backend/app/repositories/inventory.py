from typing import List, Optional
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.models.inventory import Inventory, StockMovement
from app.repositories.base import BaseRepository


class InventoryRepository(BaseRepository[Inventory]):
    def __init__(self, db: AsyncSession):
        super().__init__(Inventory, db)

    async def get_by_warehouse_and_product(self, warehouse_id: UUID, product_id: UUID) -> Optional[Inventory]:
        stmt = select(Inventory).where(
            Inventory.warehouse_id == warehouse_id,
            Inventory.product_id == product_id
        )
        res = await self.db.execute(stmt)
        return res.scalars().first()


class StockMovementRepository(BaseRepository[StockMovement]):
    def __init__(self, db: AsyncSession):
        super().__init__(StockMovement, db)
