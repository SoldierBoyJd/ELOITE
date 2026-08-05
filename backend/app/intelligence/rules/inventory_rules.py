import math
from typing import List, Dict, Any


def calculate_eoq(annual_demand: float, ordering_cost: float, holding_cost_per_unit: float) -> int:
    """
    Calculate Economic Order Quantity (EOQ):
    EOQ = sqrt((2 * D * S) / H)
    """
    if annual_demand <= 0 or ordering_cost <= 0 or holding_cost_per_unit <= 0:
        return 0
    return int(math.ceil(math.sqrt((2 * annual_demand * ordering_cost) / holding_cost_per_unit)))


def calculate_reorder_point(avg_daily_demand: float, lead_time_days: int, safety_stock: int = 0) -> int:
    """
    Calculate Reorder Point (ROP):
    ROP = (Average Daily Demand * Lead Time) + Safety Stock
    """
    return int(math.ceil((avg_daily_demand * lead_time_days) + safety_stock))


def calculate_abc_analysis(items: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    """
    Perform ABC Inventory Analysis based on annual monetary value (Quantity * Price).
    - Category A: Top ~80% cumulative value (tight control)
    - Category B: Next ~15% cumulative value (moderate control)
    - Category C: Remaining ~5% cumulative value (simple control)
    """
    if not items:
        return []

    # Calculate total value for each item
    processed = []
    total_val = 0.0
    for item in items:
        qty = float(item.get("quantity", 0))
        price = float(item.get("price", 0))
        val = qty * price
        total_val += val
        processed.append({**item, "total_value": val})

    # Sort descending by value
    processed.sort(key=lambda x: x["total_value"], reverse=True)

    cum_val = 0.0
    for item in processed:
        cum_val += item["total_value"]
        cum_pct = (cum_val / total_val * 100.0) if total_val > 0 else 100.0
        item["cumulative_percent"] = round(cum_pct, 2)

        if cum_pct <= 80.0:
            item["abc_category"] = "A"
        elif cum_pct <= 95.0:
            item["abc_category"] = "B"
        else:
            item["abc_category"] = "C"

    return processed
