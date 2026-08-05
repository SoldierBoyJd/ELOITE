from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.repositories.inventory import InventoryRepository, StockMovementRepository
from app.schemas.inventory import InventoryResponse, StockMovementCreate, StockMovementResponse
from app.intelligence.rules.inventory_rules import calculate_eoq, calculate_reorder_point

router = APIRouter(prefix="/inventory", tags=["Inventory"])


@router.get("", response_model=List[InventoryResponse])
async def list_inventory(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.INVENTORY_READ)),
):
    repo = InventoryRepository(db)
    items = await repo.get_all(skip=pagination["skip"], limit=pagination["limit"])
    return [InventoryResponse.model_validate(i) for i in items]


@router.post("/movements", response_model=StockMovementResponse, status_code=status.HTTP_201_CREATED)
async def create_stock_movement(
    data: StockMovementCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.INVENTORY_WRITE)),
):
    repo = StockMovementRepository(db)
    inv_repo = InventoryRepository(db)

    # 1. Record stock movement
    obj_data = data.model_dump()
    obj_data["company_id"] = UUID(company_id)
    movement = await repo.create(obj_data)

    # 2. Update stock level in warehouse
    inv = await inv_repo.get_by_warehouse_and_product(data.warehouse_id, data.product_id)
    if inv:
        new_qty = inv.quantity + data.quantity if data.type == "IN" else max(0, inv.quantity - data.quantity)
        await inv_repo.update(inv.id, {"quantity": new_qty})
    else:
        qty = data.quantity if data.type == "IN" else 0
        await inv_repo.create({
            "warehouse_id": data.warehouse_id,
            "product_id": data.product_id,
            "quantity": qty,
        })

    return StockMovementResponse.model_validate(movement)


@router.get("/eoq")
async def get_item_eoq(
    annual_demand: float = 1200.0,
    ordering_cost: float = 250.0,
    holding_cost: float = 15.0,
    company_id: str = Depends(get_company_id),
    _user=Depends(require_permission(Permission.INVENTORY_READ)),
):
    eoq = calculate_eoq(annual_demand, ordering_cost, holding_cost)
    rop = calculate_reorder_point(avg_daily_demand=annual_demand / 365.0, lead_time_days=7)
    return {
        "economic_order_quantity": eoq,
        "reorder_point": rop,
        "recommended_order_batch": f"{eoq} units",
    }
