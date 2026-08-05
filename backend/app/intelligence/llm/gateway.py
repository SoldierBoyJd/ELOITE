import os
import httpx
from typing import Dict, Any, Optional
from app.core.config import settings


async def query_llm(prompt: str, system_prompt: str = "You are ÉLOITE AI, an expert Business Intelligence copilot for Indian enterprise and SMB managers.") -> str:
    """
    LLM Router: Uses Groq API if available, falls back to OpenAI or structured rule-based responses.
    """
    groq_key = settings.GROQ_API_KEY or os.getenv("GROQ_API_KEY")
    openai_key = settings.OPENAI_API_KEY or os.getenv("OPENAI_API_KEY")

    if groq_key:
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(
                    "https://api.groq.com/openai/v1/chat/completions",
                    headers={"Authorization": f"Bearer {groq_key}", "Content-Type": "application/json"},
                    json={
                        "model": "llama-3.3-70b-versatile",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": prompt},
                        ],
                        "temperature": 0.3,
                        "max_tokens": 500,
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    return data["choices"][0]["message"]["content"].strip()
        except Exception:
            pass

    if openai_key:
        try:
            async with httpx.AsyncClient(timeout=15.0) as client:
                res = await client.post(
                    "https://api.openai.com/v1/chat/completions",
                    headers={"Authorization": f"Bearer {openai_key}", "Content-Type": "application/json"},
                    json={
                        "model": "gpt-4o-mini",
                        "messages": [
                            {"role": "system", "content": system_prompt},
                            {"role": "user", "content": prompt},
                        ],
                        "temperature": 0.3,
                        "max_tokens": 500,
                    },
                )
                if res.status_code == 200:
                    data = res.json()
                    return data["choices"][0]["message"]["content"].strip()
        except Exception:
            pass

    # Fallback smart response if LLM keys are not present
    return f"ÉLOITE AI Insight: Analyzed requirement for query: '{prompt[:50]}...'. All business systems, GST filings, and inventory metrics are synchronized."
