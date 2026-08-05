from __future__ import annotations

import uuid
from datetime import datetime
from typing import Optional

from sqlalchemy import Boolean, DateTime, String, Text, func
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.database.base import Base, TimestampMixin, UUIDMixin


class Company(UUIDMixin, TimestampMixin, Base):
    __tablename__ = "companies"

    name: Mapped[str] = mapped_column(Text, nullable=False)
    gst_number: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    pan: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    email: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    phone: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    address: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    city: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    state: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    industry: Mapped[Optional[str]] = mapped_column(Text, nullable=True)
    currency: Mapped[str] = mapped_column(Text, nullable=False, default="INR")
    subscription_plan: Mapped[str] = mapped_column(Text, nullable=False, default="free")
    subscription_status: Mapped[str] = mapped_column(Text, nullable=False, default="active")
    logo_url: Mapped[Optional[str]] = mapped_column(Text, nullable=True)

    # Relationships
    users: Mapped[list["User"]] = relationship("User", back_populates="company", lazy="noload")  # type: ignore[name-defined]
    warehouses: Mapped[list["Warehouse"]] = relationship("Warehouse", back_populates="company", lazy="noload")  # type: ignore[name-defined]

    def __repr__(self) -> str:
        return f"<Company id={self.id} name={self.name!r}>"
