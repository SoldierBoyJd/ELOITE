from sqlalchemy import Column, String, Text, Numeric, Date, ForeignKey
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import relationship
from app.database.base import Base, UUIDMixin, TimestampMixin


class Payment(Base, UUIDMixin, TimestampMixin):
    __tablename__ = "payments"

    company_id            = Column(UUID(as_uuid=True), ForeignKey("companies.id", ondelete="CASCADE"), nullable=False)
    invoice_id            = Column(UUID(as_uuid=True), ForeignKey("invoices.id"), nullable=False)
    amount                = Column(Numeric(12, 2), nullable=False)
    payment_date          = Column(Date, nullable=False)
    mode                  = Column(String(20), nullable=False)  # UPI, Bank, Cash, Cheque, NEFT, RTGS
    transaction_reference = Column(String(100))
    bank_name             = Column(String(100))
    cheque_number         = Column(String(50))
    notes                 = Column(Text)
    status                = Column(String(20), default="completed")  # completed, pending, failed, refunded
    created_by            = Column(UUID(as_uuid=True), ForeignKey("users.id"))

    invoice    = relationship("Invoice", back_populates="payments")
    created_by_user = relationship("User", foreign_keys=[created_by])
