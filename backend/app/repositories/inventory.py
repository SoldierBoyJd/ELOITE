from sqlalchemy import select, and_, func
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload
from typing import List, Optional
from uuid import UUID
from datetime import datetime, timezone
from app.models.inventory import Inventory, StockMovement
from app.models.product import Product
from app.models.warehouse import Warehouse
from app.repositories.base import BaseRepository


class InventoryRepository:
    def __init__(self, db: AsyncSession):
        self.db = db

    async def get_stock(self, company_id: UUID, warehouse_id: Optional[UUID] = None) -> List[dict]:
        query = (
            select(
                Inventory.id,
                Inventory.warehouse_id,
                Inventory.product_id,
                Inventory.quantity,
                Inventory.reserved_quantity,
                Inventory.damaged_quantity,
                Product.name.label("product_name"),
                Product.sku.label("product_sku"),
                Product.minimum_stock,
                Warehouse.name.label("warehouse_name"),
            )
            .join(Product, Inventory.product_id == Product.id)
            .join(Warehouse, Inventory.warehouse_id == Warehouse.id)
            .where(Product.company_id == company_id)
        )
        if warehouse_id:
            query = query.where(Inventory.warehouse_id == warehouse_id)
        result = await self.db.execute(query)
        return [dict(row._mapping) for row in result.all()]

    async def get_low_stock(self, company_id: UUID) -> List[dict]:
        query = (
            select(
                Inventory.id,
                Inventory.warehouse_id,
                Inventory.product_id,
                Inventory.quantity,
                Product.name.label("product_name"),
                Product.sku.label("product_sku"),
                Product.minimum_stock,
                Warehouse.name.label("warehouse_name"),
            )
            .join(Product, Inventory.product_id == Product.id)
            .join(Warehouse, Inventory.warehouse_id == Warehouse.id)
            .where(
                and_(
                    Product.company_id == company_id,
                    Inventory.quantity <= Product.minimum_stock,
                    Product.is_active == True,
                )
            )
            .order_by(Inventory.quantity.asc())
        )
        result = await self.db.execute(query)
        return [dict(row._mapping) for row in result.all()]

    async def get_by_product_warehouse(
        self, product_id: UUID, warehouse_id: UUID
    ) -> Optional[Inventory]:
        result = await self.db.execute(
            select(Inventory).where(
                and_(
                    Inventory.product_id == product_id,
                    Inventory.warehouse_id == warehouse_id,
                )
            )
        )
        return result.scalar_one_or_none()

    async def upsert_stock(
        self, product_id: UUID, warehouse_id: UUID, quantity_change: int
    ) -> Inventory:
        inv = await self.get_by_product_warehouse(product_id, warehouse_id)
        if inv:
            inv.quantity = max(0, inv.quantity + quantity_change)
        else:
            inv = Inventory(
                warehouse_id=warehouse_id,
                product_id=product_id,
                quantity=max(0, quantity_change),
            )
            self.db.add(inv)
        await self.db.flush()
        await self.db.refresh(inv)
        return inv

    async def record_movement(
        self,
        company_id: UUID,
        product_id: UUID,
        warehouse_id: UUID,
        movement_type: str,
        quantity: int,
        performed_by: Optional[UUID] = None,
        reference_type: Optional[str] = None,
        reference_id: Optional[UUID] = None,
        notes: Optional[str] = None,
    ) -> StockMovement:
        movement = StockMovement(
            company_id=company_id,
            product_id=product_id,
            warehouse_id=warehouse_id,
            type=movement_type,
            quantity=quantity,
            performed_by=performed_by,
            reference_type=reference_type,
            reference_id=reference_id,
            notes=notes,
            created_at=datetime.now(timezone.utc),
        )
        self.db.add(movement)
        await self.db.flush()
        return movement

    async def get_total_inventory_value(self, company_id: UUID) -> float:
        query = (
            select(func.sum(Inventory.quantity * Product.cost_price))
            .join(Product, Inventory.product_id == Product.id)
            .where(Product.company_id == company_id)
        )
        result = await self.db.execute(query)
        return float(result.scalar_one() or 0)
