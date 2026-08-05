from typing import Generic, TypeVar, Type, Optional, List, Any
from uuid import UUID
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, update, delete, func
from app.database.base import Base

ModelType = TypeVar("ModelType", bound=Base)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], db: AsyncSession):
        self.model = model
        self.db = db

    async def get_by_id(self, id: UUID, company_id: Optional[UUID] = None) -> Optional[ModelType]:
        stmt = select(self.model).where(self.model.id == id)
        if company_id and hasattr(self.model, "company_id"):
            stmt = stmt.where(self.model.company_id == company_id)
        result = await self.db.execute(stmt)
        return result.scalars().first()

    async def get_all(
        self, company_id: Optional[UUID] = None, skip: int = 0, limit: int = 50
    ) -> List[ModelType]:
        stmt = select(self.model)
        if company_id and hasattr(self.model, "company_id"):
            stmt = stmt.where(self.model.company_id == company_id)
        stmt = stmt.offset(skip).limit(limit)
        result = await self.db.execute(stmt)
        return list(result.scalars().all())

    async def create(self, obj_in: dict) -> ModelType:
        db_obj = self.model(**obj_in)
        self.db.add(db_obj)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def update(self, id: UUID, obj_in: dict, company_id: Optional[UUID] = None) -> Optional[ModelType]:
        db_obj = await self.get_by_id(id, company_id=company_id)
        if not db_obj:
            return None
        for field, value in obj_in.items():
            if value is not None and hasattr(db_obj, field):
                setattr(db_obj, field, value)
        await self.db.commit()
        await self.db.refresh(db_obj)
        return db_obj

    async def delete(self, id: UUID, company_id: Optional[UUID] = None) -> bool:
        db_obj = await self.get_by_id(id, company_id=company_id)
        if not db_obj:
            return False
        await self.db.delete(db_obj)
        await self.db.commit()
        return True
