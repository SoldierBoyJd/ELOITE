from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from jose import jwt, JWTError
from dataclasses import dataclass
from typing import Optional
import httpx

from app.core.config import settings

bearer_scheme = HTTPBearer(auto_error=False)


@dataclass
class UserContext:
    user_id: str
    company_id: Optional[str]
    role: Optional[str]
    email: str
    raw_metadata: dict


def verify_supabase_jwt(token: str) -> dict:
    """
    Verify a Supabase-issued JWT.
    Supabase uses HS256 with the project JWT secret.
    """
    try:
        payload = jwt.decode(
            token,
            settings.SUPABASE_JWT_SECRET,
            algorithms=["HS256"],
            options={"verify_aud": False},
        )
        return payload
    except JWTError as e:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail=f"Invalid authentication token: {str(e)}",
            headers={"WWW-Authenticate": "Bearer"},
        )


async def get_current_user(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> UserContext:
    if credentials is None:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Authentication required",
            headers={"WWW-Authenticate": "Bearer"},
        )

    payload = verify_supabase_jwt(credentials.credentials)

    user_id: str = payload.get("sub", "")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token: missing user ID",
        )

    email: str = payload.get("email", "")
    app_metadata: dict = payload.get("app_metadata", {})
    user_metadata: dict = payload.get("user_metadata", {})

    # company_id and role are stored in app_metadata by the backend
    # or can be fetched from DB; here we read from token if available
    company_id: Optional[str] = app_metadata.get("company_id") or user_metadata.get("company_id")
    role: Optional[str] = app_metadata.get("role") or user_metadata.get("role")

    return UserContext(
        user_id=user_id,
        company_id=company_id,
        role=role,
        email=email,
        raw_metadata={**app_metadata, **user_metadata},
    )


async def get_current_user_optional(
    credentials: Optional[HTTPAuthorizationCredentials] = Depends(bearer_scheme),
) -> Optional[UserContext]:
    if credentials is None:
        return None
    try:
        return await get_current_user(credentials)
    except HTTPException:
        return None
