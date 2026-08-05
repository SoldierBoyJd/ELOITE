from typing import Dict, Any
from app.intelligence.llm.gateway import query_llm


async def ask_copilot(query: str, context_data: Dict[str, Any] = None) -> str:
    """
    Handle natural language user queries regarding business stats, inventory, invoices, and GST.
    """
    system_prompt = (
        "You are ÉLOITE AI, a senior business intelligence advisor specializing in Indian enterprise management. "
        "Provide direct, professional, actionable advice on GST compliance, inventory reordering, invoice fraud prevention, and cash flow."
    )
    
    context_str = ""
    if context_data:
        context_str = f"\nBusiness Context: {context_data}"

    prompt = f"User Question: {query}{context_str}\nProvide a concise 2-3 sentence executive answer."
    
    return await query_llm(prompt, system_prompt=system_prompt)
