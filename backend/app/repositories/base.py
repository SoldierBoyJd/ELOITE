from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, and_
from typing import TypeVar, Generic, Type, Optional, List, Any
from uuid import UUID
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], db: AsyncSession):
        self.model = model
        self.db = db

    async def get(self, id: UUID, company_id: UUID) -> Optional[ModelType]:
        result = await self.db.execute(
            select(self.model).where(
                and_(self.model.id == id, self.model.company_id == company_id)
            )
        )
        return result.scalar_one_or_none()

    async def get_multi(
        self,
        company_id: UUID,
        skip: int = 0,
        limit: int = 20,
        filters: Optional[List[Any]] = None,
        order_by: Optional[Any] = None,
    ) -> List[ModelType]:
        query = select(self.model).where(self.model.company_id == company_id)
        if filters:
            for f in filters:
                query = query.where(f)
        if order_by is not None:
            query = query.order_by(order_by)
        else:
            query = query.order_by(self.model.created_at.desc())
        query = query.offset(skip).limit(limit)
        result = await self.db.execute(query)
        return list(result.scalars().all())

    async def count(self, company_id: UUID, filters: Optional[List[Any]] = None) -> int:
        query = select(func.count(self.model.id)).where(self.model.company_id == company_id)
        if filters:
            for f in filters:
                query = query.where(f)
        result = await self.db.execute(query)
        return result.scalar_one()

    async def create(self, obj_data: dict) -> ModelType:
        obj = self.model(**obj_data)
        self.db.add(obj)
        await self.db.flush()
        await self.db.refresh(obj)
        return obj

    async def update(self, obj: ModelType, update_data: dict) -> ModelType:
        for key, value in update_data.items():
            if value is not None:
                setattr(obj, key, value)
        await self.db.flush()
        await self.db.refresh(obj)
        return obj

    async def delete(self, obj: ModelType) -> bool:
        await self.db.delete(obj)
        await self.db.flush()
        return True

    async def soft_delete(self, obj: ModelType) -> ModelType:
        obj.is_active = False
        await self.db.flush()
        return obj
