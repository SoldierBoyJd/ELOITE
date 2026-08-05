from pydantic import BaseModel, ConfigDict
from typing import Optional
from decimal import Decimal
from datetime import datetime
import uuid


class CategoryBase(BaseModel):
    name: str


class CategoryCreate(CategoryBase):
    pass


class CategoryResponse(CategoryBase):
    id: uuid.UUID
    company_id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)


class ProductBase(BaseModel):
    name: str
    sku: Optional[str] = None
    barcode: Optional[str] = None
    description: Optional[str] = None
    hsn_code: Optional[str] = None
    gst_rate: Decimal = Decimal("18.00")
    unit: str = "pcs"
    cost_price: Decimal = Decimal("0")
    selling_price: Decimal = Decimal("0")
    minimum_stock: int = 0
    maximum_stock: Optional[int] = None
    category_id: Optional[uuid.UUID] = None


class ProductCreate(ProductBase):
    pass


class ProductUpdate(BaseModel):
    name: Optional[str] = None
    sku: Optional[str] = None
    barcode: Optional[str] = None
    description: Optional[str] = None
    hsn_code: Optional[str] = None
    gst_rate: Optional[Decimal] = None
    unit: Optional[str] = None
    cost_price: Optional[Decimal] = None
    selling_price: Optional[Decimal] = None
    minimum_stock: Optional[int] = None
    maximum_stock: Optional[int] = None
    category_id: Optional[uuid.UUID] = None
    is_active: Optional[bool] = None


class ProductResponse(ProductBase):
    id: uuid.UUID
    company_id: uuid.UUID
    is_active: bool
    image_url: Optional[str] = None
    created_at: datetime
    updated_at: datetime
    category: Optional[CategoryResponse] = None
    model_config = ConfigDict(from_attributes=True)
