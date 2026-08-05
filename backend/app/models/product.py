from sqlalchemy import Column, String, Text, Numeric, Integer, Boolean, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Category(Base, UUIDMixin):
    __tablename__ = "categories"
    company_id = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    name       = Column(String(100), nullable=False)
    products   = relationship("Product", back_populates="category", lazy="select")


class Product(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "products"

    company_id    = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    category_id   = Column(UUID(as_uuid=True), ForeignKey("categories.id"))
    sku           = Column(String(100))
    barcode       = Column(String(100))
    name          = Column(String(255), nullable=False)
    description   = Column(Text)
    hsn_code      = Column(String(20))
    gst_rate      = Column(Numeric(5, 2), default=18)
    unit          = Column(String(20), default="pcs")
    cost_price    = Column(Numeric(12, 2), default=0)
    selling_price = Column(Numeric(12, 2), default=0)
    minimum_stock = Column(Integer, default=0)
    maximum_stock = Column(Integer)
    image_url     = Column(Text)
    is_active     = Column(Boolean, default=True)

    company   = relationship("Company", back_populates="products")
    category  = relationship("Category", back_populates="products")
    inventory = relationship("Inventory", back_populates="product", lazy="select")
