from pydantic import BaseModel, ConfigDict
from typing import Optional, List, TypeVar, Generic
from datetime import datetime
import uuid

T = TypeVar("T")


class PaginatedResponse(BaseModel, Generic[T]):
    items: List[T]
    total: int
    skip: int
    limit: int
    has_more: bool


class UUIDModel(BaseModel):
    id: uuid.UUID
    model_config = ConfigDict(from_attributes=True)


class TimestampModel(UUIDModel):
    created_at: datetime
    updated_at: datetime


class MessageResponse(BaseModel):
    message: str
    success: bool = True


class ErrorResponse(BaseModel):
    detail: str
    code: Optional[str] = None
