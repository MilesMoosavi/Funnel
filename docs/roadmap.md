# Project Roadmap

## Phase 1: The Stealth Shell (PoC) [IN PROGRESS]
- [x] Build 'Human-Typing' simulator for input injection.
- [x] Implement Regex-based MCQ extraction logic.
- [/] Implement "Obsidian Nebula" UI Core (Framer Motion, Tailwind).
- [ ] Refine premium UI transitions and micro-animations.
- [x] Establish Web App ↔ Extension Auth Handshake.

## Phase 2: The Consensus Engine (MCQ) [PENDING]
- [ ] Create the 'Confidence Meter' and 'Tally' UI components.
- [ ] Establish the 'Tie-Breaker' logic for split 2v2 decisions.
- [ ] Implement side-by-side grid view for model comparisons.

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
