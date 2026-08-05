from sqlalchemy import Column, String, Text, Numeric, Integer, Date, ForeignKey, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Invoice(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "invoices"

    company_id       = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    invoice_number   = Column(String(50), nullable=False)
    type             = Column(String(20), nullable=False)  # SALE, PURCHASE, RETURN
    supplier_id      = Column(UUID(as_uuid=True), ForeignKey("suppliers.id"))
    customer_id      = Column(UUID(as_uuid=True), ForeignKey("customers.id"))
    invoice_date     = Column(Date, nullable=False)
    due_date         = Column(Date)
    subtotal         = Column(Numeric(12, 2), default=0)
    discount         = Column(Numeric(12, 2), default=0)
    gst_amount       = Column(Numeric(12, 2), default=0)
    total            = Column(Numeric(12, 2), default=0)
    amount_paid      = Column(Numeric(12, 2), default=0)
    status           = Column(String(20), default="draft")  # draft, sent, paid, partial, overdue, cancelled
    eway_bill_number = Column(String(50))
    eway_status      = Column(String(20))
    notes            = Column(Text)
    created_by       = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    company  = relationship("Company", back_populates="invoices")
    supplier = relationship("Supplier")
    customer = relationship("Customer", back_populates="invoices")
    items    = relationship("InvoiceItem", back_populates="invoice", cascade="all, delete-orphan")
    payments = relationship("Payment", back_populates="invoice", lazy="select")


class InvoiceItem(Base, UUIDMixin):
    __tablename__ = "invoice_items"

    invoice_id  = Column(UUID(as_uuid=True), ForeignKey("invoices.id", ondelete="CASCADE"), nullable=False)
    product_id  = Column(UUID(as_uuid=True), ForeignKey("products.id"))
    description = Column(Text)
    quantity    = Column(Numeric(10, 3), nullable=False)
    unit_price  = Column(Numeric(12, 2), nullable=False)
    gst_rate    = Column(Numeric(5, 2))
    gst_amount  = Column(Numeric(12, 2))
    discount    = Column(Numeric(12, 2), default=0)
    subtotal    = Column(Numeric(12, 2), nullable=False)

    invoice = relationship("Invoice", back_populates="items")
    product = relationship("Product")
