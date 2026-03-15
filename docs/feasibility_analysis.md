# Feasibility Analysis

## 1. Cross-Tab Prompt Injection

**Question**: Can an extension automatically enter prompts into multiple LLM tabs even if the user is not active in them?
**Status**: ✅ **Fully Feasible**

### Technical Execution:

- **Injection**: The extension uses `Content Scripts` injected into specific domains (e.g., `chat.openai.com`, `gemini.google.com`).
- **Targeting**: The `Background Script` (Service Worker) maintains a list of open tabs. When a user sends a prompt via the FunnelLM website, the background script broadcasts it.
- **Trigger**: The content script for each tab locates the input field (usually a `<textarea>` or `role="textbox"`), sets the `value` property, and dispatches a "KeyboardEvent" (Enter) or calls `.click()` on the send button.
- **Visibility**: Chrome extensions can interact with the DOM of background/inactive tabs without needing them to be focused.

## 2. Real-Time Response Pulling

**Question**: Can the extension scrape responses and display them in the "Group Chat" UI?
**Status**: ✅ **Fully Feasible**

### Technical Execution:

- **Observation**: The content script uses a `MutationObserver` to watch the chat container for new nodes.
- **Scraping**: Once the model stops "typing" (detected by the disappearance of a cursor element or the appearance of a "Complete" state), the script grabs the inner content of the last message block.
- **Relay**: The text is sent back to the extension's background script, which then forwards it to the Funnel website (via `window.postMessage` or a WebSocket/API relay).

## 3. The "Group Chat" UI

**Question**: Can we implement the specific UI style (WhatsApp-style icons with model versions)?
**Status**: ✅ **Fully Feasible**

### Design Strategy:

- **Visual Mapping**: The Funnel website maps the `tabId` or `origin` to a specific model profile (e.g., "ChatGPT 4o", "Claude 3.5 Sonnet").
- **Overlay Logos**: Using standard CSS (flexbox/grid) and `::after` pseudo-elements or absolute positioning to create the "sub-icon" badges showing the specific version (e.g., 5.1, 3.5).

## ⚠️ Key Challenges & Mitigations

- **DOM Stability**: UI updates on ChatGPT/Claude will break selectors.
  - _Mitigation_: Implement a "Selector Engine" that can be updated remotely via the extension without requiring a full Store update.
- **Bot Detection**: Rapid automated interactions might trigger "Are you a human?" checks.
  - _Mitigation_: Human-like delays between keystrokes and random timing offsets.
- **Authentication**:
  - _Strategy_: Prioritize **Incognito/Guest sessions** to avoid usage token depletion and history pollution.
  - _Mitigation_: The extension checks if a login is required (e.g., for Anthropic or DeepSeek) and displays a "Login Required" badge if guest access is blocked.
- **Account Safety (Stealth Drip)**: To prevent bot-detection bans, the extension will use a 'Stealth Drip' injection method, simulating human keystrokes (50-150ms delay) rather than instant DOM value setting.
- **Selector Fragility**: If standard CSS selectors fail, the script will target the 'Copy' button element, which is historically the most stable anchor in LLM UIs, to extract message content.
- **Stop Generation Support**: If the Funnel reaches an early-exit consensus majority on an MCQ (e.g., 3/4 models agree), the extension can dynamically trigger the "Stop generating" button in the remaining tabs to conserve the user's tokens/usage limits.
