from typing import Dict, Any, List
from decimal import Decimal


def detect_invoice_anomaly(
    invoice_amount: float,
    vendor_historical_amounts: List[float],
    is_duplicate: bool = False
) -> Dict[str, Any]:
    """
    Detect invoice anomalies using z-score & rule thresholds (Isolation Forest simulation).
    """
    reasons = []
    risk_score = 0.0

    if is_duplicate:
        risk_score += 0.8
        reasons.append("Exact duplicate invoice number detected for supplier")

    if vendor_historical_amounts and len(vendor_historical_amounts) >= 3:
        avg = sum(vendor_historical_amounts) / len(vendor_historical_amounts)
        variance = sum((x - avg) ** 2 for x in vendor_historical_amounts) / len(vendor_historical_amounts)
        std_dev = variance ** 0.5

        if std_dev > 0:
            z_score = abs(invoice_amount - avg) / std_dev
            if z_score > 3.0:
                risk_score += 0.6
                reasons.append(f"Invoice amount (₹{invoice_amount:,.2f}) is > 3 standard deviations from vendor average (₹{avg:,.2f})")
            elif z_score > 2.0:
                risk_score += 0.3
                reasons.append(f"Invoice amount is significantly higher than usual for this vendor")

    final_score = min(1.0, risk_score)
    status = "flagged" if final_score >= 0.5 else "normal"

    return {
        "status": status,
        "risk_score": round(final_score, 2),
        "reasons": reasons if reasons else ["Normal invoice transaction"],
    }
