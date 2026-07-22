# RakshaAI — Pitch Deck Outline (6 Slides)

---

## Slide 1: The Problem

**Title:** Indians Are Losing Crores to Scams — Every Day

**Key stat:**
- **₹1,776 crore** lost to digital arrest scams alone in the first 9 months of 2024 (Government of India data)
- Scammers impersonate CBI, ED, Customs, banks, and courier companies via calls, SMS, and WhatsApp
- Victims are threatened, isolated, and pressured into instant UPI/bank transfers
- By the time someone files a complaint, the money is gone

**Visual suggestion:** Map of India with rising fraud numbers, or a headline-style stat callout.

---

## Slide 2: Our Solution — RakshaAI

**Title:** RakshaAI — Your AI Scam Shield

**Two core features:**

1. **Scam Shield** — Paste any suspicious call transcript, SMS, or message. RakshaAI analyzes it in seconds and returns a risk score, scam type, red flags, and a clear verdict (SCAM / SUSPICIOUS / LIKELY SAFE).

2. **Note Check** — Upload a photo of a currency note. RakshaAI checks for counterfeit indicators using computer vision.

**Tagline:** *Don't guess. Verify before you pay.*

**Visual suggestion:** Split-screen mockup — chat UI on left, note-check camera on right.

---

## Slide 3: Live Demo

**Title:** See It in Action

**Content:**
> **[PLACEHOLDER — Add real screenshot here]**
>
> Screenshot of RakshaAI analyzing a digital arrest scam transcript and returning:
> - Risk score: 97/100
> - Scam type: Digital Arrest
> - Red flags: "CBI officer on video call", "do not tell family", "transfer to escrow account"
> - Verdict: SCAM

**Visual suggestion:** Full-width product screenshot with annotated callouts.

---

## Slide 4: Architecture

**Title:** How It Works

**Content:** Reference the architecture diagram from [`docs/architecture.md`](architecture.md):

```
Citizen/User → Chat UI → POST /analyze → LLM → JSON Response → Chat UI
                                              ↓
                              { risk_score, scam_type, red_flags, verdict }
```

**Talking points:**
- Simple pipeline: paste text → AI analysis → instant verdict
- LLM trained on real Indian scam patterns (digital arrest, KYC, courier, UPI)
- Structured JSON output — easy to integrate with WhatsApp bots, IVR, or mobile apps

**Visual suggestion:** Clean flow diagram (reuse architecture.md diagram).

---

## Slide 5: Impact

**Title:** From Point-of-Complaint to Point-of-Contact

**Framing:**

| Today (Status Quo)              | With RakshaAI (Our Approach)        |
|---------------------------------|-------------------------------------|
| Victim realizes after paying    | Victim checks *before* paying       |
| Files complaint at cyber cell   | Gets instant AI verdict in chat     |
| Money already transferred       | Scam blocked at point of contact  |
| Reactive, slow, low recovery    | Proactive, fast, preventive       |

**Scalability:**
- **WhatsApp bot** — forward suspicious messages, get instant analysis
- **IVR integration** — during a suspicious call, press a key to have the live transcript analyzed
- **Multi-language** — Hindi, Kannada, Tamil, Telugu (roadmap)

**Visual suggestion:** Before/after comparison or a growth chart showing potential reach.

---

## Slide 6: What's Next

**Title:** Roadmap

**Near-term (hackathon → MVP):**
- [ ] Geospatial fraud map — plot reported scam types by city/region
- [ ] More languages — Hindi, Kannada, Tamil, Telugu support
- [ ] IVR integration — real-time call analysis via phone keypress

**Medium-term:**
- [ ] WhatsApp Business API bot for mass reach
- [ ] Partnership with banks and telecom for proactive alerts
- [ ] Crowdsourced scam database — users report new patterns, AI learns

**Long-term vision:**
- RakshaAI as India's default "second opinion" before any suspicious payment
- Integration with Cyber Crime Portal (cybercrime.gov.in) for one-click reporting

**Visual suggestion:** Timeline or roadmap graphic with three phases.

---

## Presenter Notes

- **Demo flow:** Open with Slide 1 stat → jump to Slide 3 live demo → explain architecture (Slide 4) → close with impact and roadmap (Slides 5–6).
- **Time:** ~5 minutes total (45 sec per slide, 90 sec for demo).
- **Team intro:** Mention Data/Design/Pitch team contribution — sample transcripts, architecture doc, and this deck outline.
