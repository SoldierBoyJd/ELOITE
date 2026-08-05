import re
from datetime import date, timedelta
from typing import Dict, Any, List

GSTIN_REGEX = re.compile(r"^[0-9]{2}[A-Z]{5}[0-9]{4}[A-Z]{1}[1-9A-Z]{1}Z[0-9A-Z]{1}$")

# Standard HSN to GST Rate mapping (Indian GST rules)
HSN_GST_RATES: Dict[str, float] = {
    "1006": 5.0,   # Rice
    "1512": 5.0,   # Edible Oils
    "0902": 5.0,   # Tea
    "1101": 0.0,   # Wheat Flour
    "0910": 5.0,   # Turmeric & Spices
    "8471": 18.0,  # Computers & Electronics
    "3004": 12.0,  # Pharmaceuticals
}


def validate_gstin(gstin: str) -> Dict[str, Any]:
    """Validate Indian GSTIN format and extract state code."""
    if not gstin:
        return {"valid": False, "reason": "GSTIN is missing"}
    
    clean_gstin = gstin.strip().upper()
    if not GSTIN_REGEX.match(clean_gstin):
        return {"valid": False, "reason": "Invalid GSTIN format. Must be 15 alphanumeric characters (e.g. 27AAAAA0000A1Z5)"}

    state_code = clean_gstin[:2]
    pan = clean_gstin[2:12]
    return {
        "valid": True,
        "gstin": clean_gstin,
        "state_code": state_code,
        "pan": pan,
    }


def validate_hsn_gst_rate(hsn_code: str, applied_rate: float) -> Dict[str, Any]:
    """Check if the GST rate applied to an HSN code matches official tax slabs."""
    if not hsn_code:
        return {"valid": True, "flagged": False}
    
    expected_rate = HSN_GST_RATES.get(hsn_code.strip())
    if expected_rate is not None and abs(expected_rate - applied_rate) > 0.01:
        return {
            "valid": False,
            "flagged": True,
            "hsn_code": hsn_code,
            "applied_rate": applied_rate,
            "expected_rate": expected_rate,
            "message": f"HSN {hsn_code} usually incurs {expected_rate}% GST, but {applied_rate}% was applied.",
        }

    return {"valid": True, "flagged": False}


def calculate_gst_deadlines(reference_date: date = None) -> List[Dict[str, Any]]:
    """Calculate upcoming GST filing deadlines (GSTR-1, GSTR-3B)."""
    today = reference_date or date.today()
    current_month = today.month
    current_year = today.year

    # GSTR-1 is due on the 11th of every month for previous month
    # GSTR-3B is due on the 20th of every month
    gstr1_due = date(current_year, current_month, 11)
    if today > gstr1_due:
        # Next month's 11th
        next_m = 1 if current_month == 12 else current_month + 1
        next_y = current_year + 1 if current_month == 12 else current_year
        gstr1_due = date(next_y, next_m, 11)

    gstr3b_due = date(current_year, current_month, 20)
    if today > gstr3b_due:
        next_m = 1 if current_month == 12 else current_month + 1
        next_y = current_year + 1 if current_month == 12 else current_year
        gstr3b_due = date(next_y, next_m, 20)

    return [
        {
            "form": "GSTR-1",
            "due_date": gstr1_due.isoformat(),
            "days_remaining": (gstr1_due - today).days,
            "status": "urgent" if (gstr1_due - today).days <= 3 else "normal",
        },
        {
            "form": "GSTR-3B",
            "due_date": gstr3b_due.isoformat(),
            "days_remaining": (gstr3b_due - today).days,
            "status": "urgent" if (gstr3b_due - today).days <= 3 else "normal",
        },
    ]
