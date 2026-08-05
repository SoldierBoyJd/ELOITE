import uuid
from sqlalchemy import Column, String, ForeignKey, Boolean, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Role(Base, UUIDMixin):
    __tablename__ = "roles"
    name        = Column(String(50), unique=True, nullable=False)
    description = Column(String(255))
    users       = relationship("User", back_populates="role_obj", lazy="select")
    permissions = relationship("RolePermission", back_populates="role", lazy="select")


class Permission(Base, UUIDMixin):
    __tablename__ = "permissions"
    module = Column(String(50), nullable=False)
    action = Column(String(50), nullable=False)


class RolePermission(Base):
    __tablename__ = "role_permissions"
    role_id       = Column(UUID(as_uuid=True), ForeignKey("roles.id", ondelete="CASCADE"), primary_key=True)
    permission_id = Column(UUID(as_uuid=True), ForeignKey("permissions.id", ondelete="CASCADE"), primary_key=True)
    role          = relationship("Role", back_populates="permissions")
    permission    = relationship("Permission")


class User(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "users"

    supabase_uid = Column(UUID(as_uuid=True), unique=True, nullable=False)
    company_id   = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"))
    name         = Column(String(255), nullable=False)
    email        = Column(String(255), nullable=False)
    phone        = Column(String(20))
    role_id      = Column(UUID(as_uuid=True), ForeignKey("roles.id"))
    status       = Column(String(20), default="active", nullable=False)
    last_login   = Column(DateTime(timezone=True))

    company  = relationship("Company", back_populates="users")
    role_obj = relationship("Role", back_populates="users")
