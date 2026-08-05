from sqlalchemy import Column, String, Text, Numeric, Integer, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Customer(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "customers"

    company_id    = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    name          = Column(String(255), nullable=False)
    gst_number    = Column(String(15))
    phone         = Column(String(20))
    email         = Column(String(255))
    address       = Column(Text)
    city          = Column(String(100))
    state         = Column(String(100))
    payment_terms = Column(Integer, default=30)
    credit_limit  = Column(Numeric(12, 2))
    is_active     = Column(Boolean, default=True)

    company  = relationship("Company", back_populates="customers")
    invoices = relationship("Invoice", back_populates="customer", lazy="select")
