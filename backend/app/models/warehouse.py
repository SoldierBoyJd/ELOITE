from sqlalchemy import Column, String, Text, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Warehouse(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "warehouses"

    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    name       = Column(String(255), nullable=False)
    location   = Column(Text)
    city       = Column(String(100))
    state      = Column(String(100))
    manager_id = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    is_active  = Column(Boolean, default=True)

    company   = relationship("Company", back_populates="warehouses")
    manager   = relationship("User", foreign_keys=[manager_id])
    inventory = relationship("Inventory", back_populates="warehouse", lazy="select")
