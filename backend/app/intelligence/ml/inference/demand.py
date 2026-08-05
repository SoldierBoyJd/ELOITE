from typing import List, Dict, Any
import numpy as np


def predict_demand(historical_sales: List[float], forecast_days: int = 14) -> Dict[str, Any]:
    """
    Predict demand using exponential smoothing & trend projection.
    """
    if not historical_sales or len(historical_sales) < 3:
        # Default baseline prediction if history is sparse
        baseline = float(np.mean(historical_sales)) if historical_sales else 10.0
        predictions = [round(baseline * (1.0 + 0.01 * i), 1) for i in range(1, forecast_days + 1)]
        return {
            "forecast_days": forecast_days,
            "predictions": predictions,
            "confidence": 0.75,
            "trend": "stable",
        }

    series = np.array(historical_sales, dtype=float)
    # Simple Holt linear trend forecasting
    alpha = 0.3
    beta = 0.1
    
    level = series[0]
    trend = series[1] - series[0]
    
    for val in series[1:]:
        last_level = level
        level = alpha * val + (1 - alpha) * (level + trend)
        trend = beta * (level - last_level) + (1 - beta) * trend

    predictions = []
    for h in range(1, forecast_days + 1):
        pred = max(0.0, level + h * trend)
        predictions.append(round(float(pred), 1))

    direction = "upward" if trend > 0.05 else ("downward" if trend < -0.05 else "stable")

    return {
        "forecast_days": forecast_days,
        "predictions": predictions,
        "confidence": 0.88,
        "trend": direction,
    }
