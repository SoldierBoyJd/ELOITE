from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.services.product_service import ProductService
from app.schemas.product import ProductCreate, ProductUpdate, ProductResponse

router = APIRouter(prefix="/products", tags=["Products"])


@router.get("", response_model=List[ProductResponse])
async def list_products(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PRODUCTS_READ)),
):
    service = ProductService(db)
    return await service.list_products(UUID(company_id), skip=pagination["skip"], limit=pagination["limit"])


@router.post("", response_model=ProductResponse, status_code=status.HTTP_201_CREATED)
async def create_product(
    data: ProductCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PRODUCTS_WRITE)),
):
    service = ProductService(db)
    return await service.create_product(UUID(company_id), data)


@router.get("/{product_id}", response_model=ProductResponse)
async def get_product(
    product_id: UUID,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PRODUCTS_READ)),
):
    service = ProductService(db)
    product = await service.get_product(product_id, UUID(company_id))
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")
    return product


@router.put("/{product_id}", response_model=ProductResponse)
async def update_product(
    product_id: UUID,
    data: ProductUpdate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PRODUCTS_WRITE)),
):
    service = ProductService(db)
    updated = await service.update_product(product_id, UUID(company_id), data)
    if not updated:
        raise HTTPException(status_code=404, detail="Product not found")
    return updated


@router.delete("/{product_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_product(
    product_id: UUID,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.PRODUCTS_DELETE)),
):
    service = ProductService(db)
    deleted = await service.delete_product(product_id, UUID(company_id))
    if not deleted:
        raise HTTPException(status_code=404, detail="Product not found")
