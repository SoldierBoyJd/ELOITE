from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.dependencies import get_db, get_company_id, get_pagination
from app.core.permissions import require_permission, Permission
from app.repositories.customer import CustomerRepository
from app.schemas.customer import CustomerCreate, CustomerResponse

router = APIRouter(prefix="/customers", tags=["Customers"])


@router.get("", response_model=List[CustomerResponse])
async def list_customers(
    company_id: str = Depends(get_company_id),
    pagination: dict = Depends(get_pagination),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.CUSTOMERS_READ)),
):
    repo = CustomerRepository(db)
    customers = await repo.get_all(company_id=UUID(company_id), skip=pagination["skip"], limit=pagination["limit"])
    return [CustomerResponse.model_validate(c) for c in customers]


@router.post("", response_model=CustomerResponse, status_code=status.HTTP_201_CREATED)
async def create_customer(
    data: CustomerCreate,
    company_id: str = Depends(get_company_id),
    db: AsyncSession = Depends(get_db),
    _user=Depends(require_permission(Permission.CUSTOMERS_WRITE)),
):
    repo = CustomerRepository(db)
    obj_data = data.model_dump()
    obj_data["company_id"] = UUID(company_id)
    customer = await repo.create(obj_data)
    return CustomerResponse.model_validate(customer)
