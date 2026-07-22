# Isha's Deliverables — Data / Design / Pitch

This folder contains my contributions to the RakshaAI hackathon project for the Data, Design, and Pitch track.

## What's included

### `assets/sample-transcripts/`

Eight realistic scam transcripts in English, modeled on real Indian fraud patterns. These serve as test inputs for the Scam Shield feature and as demo material for the pitch:

| File | Scam type | Description |
|------|-----------|-------------|
| `digital-arrest-1.txt` | Digital arrest | Fake CBI officer threatens NDPS case, demands ₹2.5L escrow deposit |
| `digital-arrest-2.txt` | Digital arrest | Fake ED officer flags money laundering, demands compliance penalty + AnyDesk access |
| `kyc-fraud-1.txt` | KYC fraud | Spoofed HDFC SMS with fake KYC link; captures card details and OTP |
| `kyc-fraud-2.txt` | KYC fraud | Fake SBI caller harvests OTPs under guise of KYC verification |
| `courier-scam-1.txt` | Courier scam | Fake Blue Dart call about intercepted parcel with drugs; demands customs penalty |
| `courier-scam-2.txt` | Courier scam | Fake DTDC call about Singapore parcel with fake passports and drugs |
| `upi-fraud-1.txt` | UPI fraud | Fake "money received" SMS; phishing page captures UPI PIN |
| `upi-fraud-2.txt` | UPI fraud | Fake PhonePe/NPCI reward call; tricks user into entering UPI PIN |

### `docs/`

| File | Purpose |
|------|---------|
| `architecture.md` | Text-based system diagram: User → Chat UI → `/analyze` API → LLM → JSON response → UI. Includes response schema and data flow. |
| `pitch-deck-outline.md` | Six-slide pitch deck outline covering problem (₹1,776 crore stat), solution, demo placeholder, architecture, impact framing, and roadmap. |

Use the sample transcripts to test the `/analyze` endpoint and populate the live demo slide. The architecture doc and pitch outline are ready for the presentation — just add a real screenshot to Slide 3.
