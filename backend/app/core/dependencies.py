from fastapi import Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession
from typing import Optional
import uuid

from app.core.security import UserContext, get_current_user
from app.database.session import get_db


async def get_company_id(
    user: UserContext = Depends(get_current_user),
) -> str:
    """Extract and validate company_id from current user context."""
    if not user.company_id:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="User is not associated with a company. Complete onboarding first.",
        )
    return user.company_id


async def get_pagination(skip: int = 0, limit: int = 20) -> dict:
    """Standard pagination parameters."""
    limit = min(limit, 100)  # cap at 100
    return {"skip": skip, "limit": limit}


# Re-export commonly used dependencies
__all__ = [
    "get_db",
    "get_current_user",
    "get_company_id",
    "get_pagination",
]
