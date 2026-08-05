from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.core.config import settings
from app.api import (
    dashboard, products, invoices, inventory,
    payments, suppliers, customers, gst, ai
)

app = FastAPI(
    title=settings.APP_NAME,
    version=settings.APP_VERSION,
    description="ÉLOITE AI Business Intelligence Backend API — Rules, ML & LLM Architecture",
)

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_origins_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers under /api/v1
app.include_router(dashboard.router, prefix="/api/v1")
app.include_router(products.router,  prefix="/api/v1")
app.include_router(invoices.router,  prefix="/api/v1")
app.include_router(inventory.router, prefix="/api/v1")
app.include_router(payments.router,  prefix="/api/v1")
app.include_router(suppliers.router, prefix="/api/v1")
app.include_router(customers.router, prefix="/api/v1")
app.include_router(gst.router,       prefix="/api/v1")
app.include_router(ai.router,        prefix="/api/v1")


@app.get("/health", tags=["Health"])
async def health_check():
    return {
        "status": "healthy",
        "app": settings.APP_NAME,
        "version": settings.APP_VERSION,
        "environment": settings.ENVIRONMENT,
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app.main:app", host="0.0.0.0", port=8000, reload=True)
