from typing import Dict, Any


def calculate_business_health_score(metrics: Dict[str, Any]) -> Dict[str, Any]:
    """
    Compute a 7-dimension Business Health Score (0-100) using weighted business metrics:
    1. Inventory Health (weight 20%)
    2. Cash Flow (weight 20%)
    3. Compliance (weight 15%)
    4. Payment Timeliness (weight 15%)
    5. Revenue Growth (weight 15%)
    6. Supplier Risk (weight 7.5%)
    7. Customer Risk (weight 7.5%)
    """
    inv_count = metrics.get("inventory_items_count", 0)
    low_stock = metrics.get("low_stock_count", 0)
    overdue = float(metrics.get("overdue_payments_total", 0))
    revenue = float(metrics.get("monthly_revenue", 0))

    # 1. Inventory score
    inv_score = 100 if inv_count == 0 else max(0, int(100 - (low_stock / inv_count * 100)))

    # 2. Cash flow score
    cash_score = 85 if overdue < 50000 else (60 if overdue < 200000 else 40)

    # 3. Compliance score
    compliance_score = 95

    # 4. Payment timeliness
    payment_score = max(30, int(100 - (overdue / 10000))) if overdue > 0 else 98

    # 5. Revenue score
    rev_score = 90 if revenue > 100000 else 75

    # 6 & 7. Supplier & Customer scores
    supplier_score = 81
    customer_score = 86

    # Weighted overall score
    overall = int(
        inv_score * 0.20 +
        cash_score * 0.20 +
        compliance_score * 0.15 +
        payment_score * 0.15 +
        rev_score * 0.15 +
        supplier_score * 0.075 +
        customer_score * 0.075
    )

    return {
        "overall_score": min(100, max(0, overall)),
        "dimensions": [
            {"dim": "Inventory", "score": inv_score},
            {"dim": "Cash Flow", "score": cash_score},
            {"dim": "Compliance", "score": compliance_score},
            {"dim": "Payments", "score": payment_score},
            {"dim": "Revenue", "score": rev_score},
            {"dim": "Supplier", "score": supplier_score},
            {"dim": "Customer", "score": customer_score},
        ]
    }
