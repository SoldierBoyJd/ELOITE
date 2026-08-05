from sqlalchemy import Column, String, Text, Boolean
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Company(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "companies"

    name                = Column(String(255), nullable=False)
    gst_number          = Column(String(15))
    pan                 = Column(String(10))
    email               = Column(String(255))
    phone               = Column(String(20))
    address             = Column(Text)
    city                = Column(String(100))
    state               = Column(String(100))
    industry            = Column(String(100))
    currency            = Column(String(10), default="INR", nullable=False)
    logo_url            = Column(Text)
    subscription_plan   = Column(String(50), default="free", nullable=False)
    subscription_status = Column(String(50), default="active", nullable=False)

    # Relationships
    users       = relationship("User",       back_populates="company", lazy="select")
    warehouses  = relationship("Warehouse",  back_populates="company", lazy="select")
    products    = relationship("Product",    back_populates="company", lazy="select")
    suppliers   = relationship("Supplier",   back_populates="company", lazy="select")
    customers   = relationship("Customer",   back_populates="company", lazy="select")
    invoices    = relationship("Invoice",    back_populates="company", lazy="select")
