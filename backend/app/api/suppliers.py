from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.repositories.supplier import SupplierRepository
from app.schemas.supplier import SupplierCreate, SupplierResponse

router = APIRouter(prefix="/suppliers", tags=["Suppliers"])


@router.get("", response_model=List[SupplierResponse])
async def list_suppliers(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.SUPPLIERS_READ)),
):
    repo = SupplierRepository(db)
    suppliers = await repo.get_all(company_id=UUID(company_id), skip=pagination["skip"], limit=pagination["limit"])
    return [SupplierResponse.model_validate(s) for s in suppliers]


@router.post("", response_model=SupplierResponse, status_code=status.HTTP_201_CREATED)
async def create_supplier(
    data: SupplierCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.SUPPLIERS_WRITE)),
):
    repo = SupplierRepository(db)
    obj_data = data.model_dump()
    obj_data["company_id"] = UUID(company_id)
    supplier = await repo.create(obj_data)
    return SupplierResponse.model_validate(supplier)
