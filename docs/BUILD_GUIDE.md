# FunnelLM Build Guide (Execution Plan)

> **Agent Instruction:** When executing the UI phases below (Batch 5), continually reference the `docs/design_inspiration/messaging_references/` folder to ensure the aesthetic aligns with premium messaging standards (Discord, Google Messages, GroupMe). Do NOT rely on generic UI patterns.

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
- Implement the collapsing Streaming/Thinking states (pulsing `...` and "Read more...").
- Integrate Message Timestamps, Sticky Dates, and Message Hover actions (Copy/Reply).
- Build the Input Command Center with `@` Targeted Mentions and explicit "Stop All" trigger.
- Add the Group Settings Sidebar (triggered by top header tap) for Search, Gallery, and "Add LLMs" functionality.
- Finally, build the Funnel Synthesis bubble, Tally View, and Split Decision state.
