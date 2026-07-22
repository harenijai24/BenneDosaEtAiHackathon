# RakshaAI — System Architecture

## Overview

RakshaAI is an AI-powered scam detection tool that analyzes suspicious call transcripts, SMS messages, and chat logs. Users paste or upload text into a chat UI; the backend sends it to an LLM for analysis and returns a structured risk assessment.

## Architecture Diagram

```
┌─────────────────┐
│  Citizen/User   │
│  (pastes scam   │
│   transcript,   │
│   SMS, or msg)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│    Chat UI      │
│  (web frontend) │
└────────┬────────┘
         │  POST /analyze
         │  { "text": "..." }
         ▼
┌─────────────────┐
│  /analyze API   │
│  (backend)      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│      LLM        │
│  (scam pattern  │
│   classification│
│   + reasoning)  │
└────────┬────────┘
         │
         ▼
┌─────────────────────────────────────────┐
│           JSON Response                 │
│  {                                      │
│    "risk_score": 0–100,                 │
│    "scam_type": "digital_arrest",       │
│    "red_flags": ["...", "..."],         │
│    "verdict": "SCAM" | "SUSPICIOUS"     │
│               | "LIKELY_SAFE"           │
│  }                                      │
└────────┬────────────────────────────────┘
         │
         ▼
┌─────────────────┐
│    Chat UI      │
│  (displays risk │
│   score, type,  │
│   flags, and    │
│   verdict)      │
└─────────────────┘
```

## Data Flow

1. **Input** — User pastes a suspicious message, call transcript, or SMS into the chat UI.
2. **API call** — Frontend sends the text to `POST /analyze`.
3. **LLM analysis** — Backend prompts the LLM with known Indian scam patterns (digital arrest, KYC fraud, courier scams, UPI fraud) and asks for structured output.
4. **Response** — LLM returns a JSON object with risk score, scam type, red flags, and verdict.
5. **Display** — UI renders the result so the user can decide whether to block, report, or ignore.

## Response Schema

| Field        | Type     | Description                                      |
|--------------|----------|--------------------------------------------------|
| `risk_score` | integer  | 0–100; higher = more likely a scam               |
| `scam_type`  | string   | e.g. `digital_arrest`, `kyc_fraud`, `courier`, `upi_fraud` |
| `red_flags`  | string[] | Specific phrases or tactics that triggered the alert |
| `verdict`    | string   | `SCAM`, `SUSPICIOUS`, or `LIKELY_SAFE`           |

## Sample Transcripts

Test inputs live in `assets/sample-transcripts/` — eight realistic transcripts covering the four scam categories above. Use them to demo and validate the `/analyze` endpoint.
