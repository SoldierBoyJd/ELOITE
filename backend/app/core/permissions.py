from enum import Enum
from fastapi import Depends, HTTPException, status
from typing import Callable
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, text

from app.core.security import UserContext, get_current_user
from app.database.session import get_db


class Permission(str, Enum):
    # Inventory
    INVENTORY_READ   = "inventory:read"
    INVENTORY_WRITE  = "inventory:write"
    INVENTORY_DELETE = "inventory:delete"
    # Products
    PRODUCTS_READ    = "products:read"
    PRODUCTS_WRITE   = "products:write"
    PRODUCTS_DELETE  = "products:delete"
    # Invoices
    INVOICES_READ    = "invoices:read"
    INVOICES_WRITE   = "invoices:write"
    INVOICES_DELETE  = "invoices:delete"
    # Payments
    PAYMENTS_READ    = "payments:read"
    PAYMENTS_WRITE   = "payments:write"
    # GST
    GST_READ         = "gst:read"
    GST_WRITE        = "gst:write"
    # Customers
    CUSTOMERS_READ   = "customers:read"
    CUSTOMERS_WRITE  = "customers:write"
    # Suppliers
    SUPPLIERS_READ   = "suppliers:read"
    SUPPLIERS_WRITE  = "suppliers:write"
    # Reports
    REPORTS_READ     = "reports:read"
    REPORTS_EXPORT   = "reports:export"
    # Users
    USERS_READ       = "users:read"
    USERS_WRITE      = "users:write"
    USERS_DELETE     = "users:delete"
    # Settings
    SETTINGS_READ    = "settings:read"
    SETTINGS_WRITE   = "settings:write"
    # AI
    AI_READ          = "ai:read"


# Role → permissions mapping (mirrors DB seed data)
ROLE_PERMISSIONS: dict[str, set[Permission]] = {
    "owner": set(Permission),  # all permissions
    "admin": {
        Permission.INVENTORY_READ, Permission.INVENTORY_WRITE,
        Permission.PRODUCTS_READ, Permission.PRODUCTS_WRITE,
        Permission.INVOICES_READ, Permission.INVOICES_WRITE,
        Permission.PAYMENTS_READ, Permission.PAYMENTS_WRITE,
        Permission.GST_READ, Permission.GST_WRITE,
        Permission.CUSTOMERS_READ, Permission.CUSTOMERS_WRITE,
        Permission.SUPPLIERS_READ, Permission.SUPPLIERS_WRITE,
        Permission.REPORTS_READ, Permission.REPORTS_EXPORT,
        Permission.USERS_READ, Permission.USERS_WRITE,
        Permission.SETTINGS_READ, Permission.SETTINGS_WRITE,
        Permission.AI_READ,
    },
    "finance_manager": {
        Permission.INVOICES_READ, Permission.INVOICES_WRITE,
        Permission.PAYMENTS_READ, Permission.PAYMENTS_WRITE,
        Permission.GST_READ, Permission.GST_WRITE,
        Permission.CUSTOMERS_READ, Permission.SUPPLIERS_READ,
        Permission.REPORTS_READ, Permission.REPORTS_EXPORT,
        Permission.AI_READ,
    },
    "inventory_manager": {
        Permission.INVENTORY_READ, Permission.INVENTORY_WRITE,
        Permission.PRODUCTS_READ, Permission.PRODUCTS_WRITE,
        Permission.SUPPLIERS_READ, Permission.SUPPLIERS_WRITE,
        Permission.REPORTS_READ,
        Permission.AI_READ,
    },
    "sales_manager": {
        Permission.INVOICES_READ, Permission.INVOICES_WRITE,
        Permission.CUSTOMERS_READ, Permission.CUSTOMERS_WRITE,
        Permission.INVENTORY_READ, Permission.PRODUCTS_READ,
        Permission.REPORTS_READ,
        Permission.AI_READ,
    },
    "warehouse_staff": {
        Permission.INVENTORY_READ, Permission.INVENTORY_WRITE,
        Permission.PRODUCTS_READ,
    },
    "auditor": {
        Permission.INVENTORY_READ, Permission.PRODUCTS_READ,
        Permission.INVOICES_READ, Permission.PAYMENTS_READ,
        Permission.GST_READ, Permission.CUSTOMERS_READ,
        Permission.SUPPLIERS_READ, Permission.REPORTS_READ,
        Permission.AI_READ,
    },
}


def require_permission(permission: Permission) -> Callable:
    """
    FastAPI dependency factory.
    Usage: Depends(require_permission(Permission.INVOICES_WRITE))
    """
    async def _check(user: UserContext = Depends(get_current_user)):
        role = user.role or "warehouse_staff"
        allowed = ROLE_PERMISSIONS.get(role, set())
        if permission not in allowed:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail=f"Permission denied: {permission.value} requires role with this access",
            )
        return user
    return _check


def require_any_permission(*permissions: Permission) -> Callable:
    async def _check(user: UserContext = Depends(get_current_user)):
        role = user.role or "warehouse_staff"
        allowed = ROLE_PERMISSIONS.get(role, set())
        if not any(p in allowed for p in permissions):
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Permission denied",
            )
        return user
    return _check
