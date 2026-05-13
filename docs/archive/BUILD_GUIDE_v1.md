# FunnelLM Build Guide (Execution Plan) - [HISTORICAL / ARCHIVED]

> [!CAUTION]
> This guide is preserved for historical reference only. Current project progress has overtaken these batches, particularly with UI refinements. See `docs/roadmap.md` for current status.

> **Agent Instruction 2 (Core Philosophy):** DO NOT include redundant hints, generic onboarding text, or "slop comments" (like "Type a prompt below to get started"). Assume the user knows exactly why they are here. Keep the interface absolutely minimal, functional, and uncluttered.
> **Agent Instruction 3 (UI Strictness):** NEVER modify UI labels, conversation names, hardcoded header titles, or established button text without an explicit instruction to do so. Maintain existing naming conventions unless asked to refactor them.
## Batch 1: The Foundation & Auth Handshake
- **Goal:** Prove the Web App can send its session UID to the Extension Background Script (`chrome.runtime.sendMessage`).
- Initialize Next.js app with Tailwind and Framer Motion base.
- Setup basic User Identity structure (Firebase/NextAuth).
- Build the basic Manifest V3 Extension shell.

## Batch 2: The "Wiring" (Cross-Tab Communication)
- **Goal:** Prove the Web App can trigger an action in a background LLM tab.
- Create Content Scripts strictly for injecting a hardcoded string ("Hello") into an open ChatGPT tab.
- Establish the Tab Heartbeat mechanism to track active/closed tabs.

## Batch 3: The Stealth Scrapers (Read-Only)
- **Goal:** Prove the Extension can read model outputs in real-time and send them to the 'Brain'.
- Implement `MutationObserver` logic in Content Scripts.
- Setup "Stealth Drip" typing simulator for input.
- Relay LLM text back to the Extension Background script.

## Batch 4: The Deterministic Arbiter (The Brain)
- **Goal:** Prove the Service Worker can calculate the Confidence Meter integer before passing it to the UI.
- Implement the Majority Vote regex parsing (`Answer: [X]` and `\boxed{}`).
- Implement the 'Ghost Tab' timeout (15s) and Quorum logic (min 2 models).

## Batch 5: "Obsidian Nebula" UI & The Consensus Hub
- **Goal:** Connect the real data flowing from Batch 4 into the polished UI.
- Build the Group Chat aesthetic, Model Avatars, and Status Badges (Green/Yellow/Red).
- Implement the "Transition to Bottom" layout logic: Chat input starts centered to maximize focus and moves to the footer fixed position only after the first message is sent.
- Implement the collapsing Streaming/Thinking states (pulsing `...` and "Read more...").
- Integrate Message Timestamps, Sticky Dates, and Message Hover actions (Copy/Reply).
- Build the Input Command Center with `@` Targeted Mentions and explicit "Stop All" trigger.
- Add the Group Settings Sidebar (triggered by top header tap) for Search, Gallery, and "Add LLMs" functionality.
- Finally, build the Funnel Synthesis bubble, Tally View, and Split Decision state.
