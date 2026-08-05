from pydantic import BaseModel, ConfigDict, EmailStr
from typing import Optional
from datetime import datetime
import uuid


class CompanyBase(BaseModel):
    name: str
    gst_number: Optional[str] = None
    pan: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    industry: Optional[str] = None
    currency: str = "INR"


class CompanyCreate(CompanyBase):
    pass


class CompanyUpdate(BaseModel):
    name: Optional[str] = None
    gst_number: Optional[str] = None
    pan: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    address: Optional[str] = None
    city: Optional[str] = None
    state: Optional[str] = None
    industry: Optional[str] = None
    currency: Optional[str] = None
    logo_url: Optional[str] = None


class CompanyResponse(CompanyBase):
    id: uuid.UUID
    logo_url: Optional[str] = None
    subscription_plan: str
    subscription_status: str
    created_at: datetime
    updated_at: datetime
    model_config = ConfigDict(from_attributes=True)
