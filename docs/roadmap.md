# Project Roadmap

## Phase 1: The Stealth Shell (PoC)
- [ ] Build 'Human-Typing' simulator for input injection.
- [ ] Implement Regex-based MCQ extraction logic.
## Phase 2: The Consensus Engine (MCQ)
- [ ] Create the 'Confidence Meter' and 'Tally' UI components.
- [ ] Establish the 'Tie-Breaker' logic for split 2v2 decisions.

## Phase 3: Intelligence & Refinement

- [ ] Add "Consensus Logic" (Detecting when models agree).
- [ ] Implement "Context Re-Injection" (Automatically inject reasoning from one model into another if tied 2v2).
- [ ] Implement SIDE-BY-SIDE grid view.
- [ ] Add Chat History & Account Management (Firebase/NextAuth).
- [ ] Responsive design for Tablet/Mobile viewing of synthesized data.

## Phase 4: Polish & Deployment

- [ ] Advanced micro-animations and transitions.
- [ ] Edge-case handling (Network errors, Session timeouts).
- [ ] Deploy Web App to Vercel.
- [ ] Package Extension for Chrome Web Store (Beta/Unlisted).

## Phase 5: Local SLM Fallback (Adjudication)

- [ ] Integrate local SLM capability (e.g., Gemma-2, Llama-3) to act as a definitive, deterministic adjudicator when external models are permanently deadlocked or unavailable.
