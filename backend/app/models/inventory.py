from sqlalchemy import Column, Integer, ForeignKey, String, Text, DateTime
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Inventory(Base, UUIDMixin):
    __tablename__ = "inventory"

    warehouse_id      = Column(UUID(as_uuid=True), ForeignKey("warehouses.id", ondelete="CASCADE"), nullable=False)
    product_id        = Column(UUID(as_uuid=True), ForeignKey("products.id", ondelete="CASCADE"), nullable=False)
    quantity          = Column(Integer, default=0, nullable=False)
    reserved_quantity = Column(Integer, default=0, nullable=False)
    damaged_quantity  = Column(Integer, default=0, nullable=False)

    warehouse = relationship("Warehouse", back_populates="inventory")
    product   = relationship("Product", back_populates="inventory")


class StockMovement(Base, UUIDMixin):
    __tablename__ = "stock_movements"

    company_id     = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    product_id     = Column(UUID(as_uuid=True), ForeignKey("products.id"), nullable=False)
    warehouse_id   = Column(UUID(as_uuid=True), ForeignKey("warehouses.id"), nullable=False)
    type           = Column(String(20), nullable=False)  # IN, OUT, RETURN, TRANSFER, ADJUSTMENT
    quantity       = Column(Integer, nullable=False)
    reference_type = Column(String(50))  # invoice, purchase_order, manual
    reference_id   = Column(UUID(as_uuid=True))
    notes          = Column(Text)
    performed_by   = Column(UUID(as_uuid=True), ForeignKey("users.id"))
    created_at     = Column(DateTime(timezone=True), nullable=False)

    product      = relationship("Product")
    warehouse    = relationship("Warehouse")
    performed_by_user = relationship("User", foreign_keys=[performed_by])
