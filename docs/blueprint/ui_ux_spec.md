# UI/UX Specification

## Design Aesthetic: "The Obsidian Nebula"

The app should feel premium, sleek, and highly responsive.

- **Palette**: Deep charcoal background (#0F0F0F), subtle glassmorphism for containers, and model-specific accent colors (ChatGPT-Green, Claude-Orange, Gemini-Blue).
- **Typography**: Clean, geometric sans-serif (e.g., _Inter_ or _Outfit_).

## Layout Diagram (ASCII)

### A. Logged Out (Default)

```text
_______________________________________________________________________________
| FUNNEL   |                                                  | [?] [-] [X]|
|______________|           CONVERSATION: MATH PROBLEMS            |____________|
|              |__________________________________________________|            |
| [!] SIGN IN  |                                                               |
| TO SAVE      |                                       ______________________  |
| CHATS & USE  |                                       | (•) User           |  |
| FOLDERS      |                                       | What is 15% of 85? |  |
|              |                                       |____________________|  |
|              |                                                               |
|              |   ₒ(●)• ChatGPT 5.1                                          |
|              |   _______________________                                     |
|              |   | . . .               | <--- [Typing Animation]             |
|              |   |_____________________|                                     |
|              |                                                               |
|              |   ₒ(●)• Claude 4.6 Sonnet                                     |
|              |   _______________________                                     |
|              |   | 15% of 85 is 12.75... | <--- [Condensed Box]              |
|              |   | [Read more...]        |                                   |
|              |   |_______________________|                                   |
|              |                                                               |
|              |   {V} Funnel                                                  |
|              |   __________________________________________________________  |
|              |   | [CONSENSUS]: All models agree the result is 12.75.     |  |
|______________|   |________________________________________________________|  |
| (•) Guest    |   __________________________________________________________  |
| [Settings]   |   | [+] [ Type your prompt here...                ] [Mic] [->]| |
|______________|___|___________________________________________________________|_|
```

### B. Logged In (Chat Management)

```text
_______________________________________________________________________________
| FUNNEL   |                                                  | [?] [-] [X]|
|______________|           CONVERSATION: MATH PROBLEMS            |____________|
| [ CHATS ] [+]|__________________________________________________|            |
|              |                                                               |
| v [ SCHOOL ] |                                                               |
|   (•) Bio Prp|                                       ______________________  |
|   (•) Physics|                                       | (•) User           |  |
|              |                                       | What is 15% of 85? |  |
| > [ WORK ]   |                                       |____________________|  |
|              |                                                               |
| (•) Math Q1 :|   ₒ(●)• ChatGPT 5.1                                          |
|              |   _______________________                                     |
|              |   | . . .               | <--- [Typing Animation]             |
|              |   |_____________________|                                     |
|              |                                                               |
|              |   ₒ(●)• Claude 4.6 Sonnet                                     |
|              |   _______________________                                     |
|              |   | 15% of 85 is 12.75... | <--- [Condensed Box]              |
|              |   | [Read more...]        |                                   |
|              |   |_______________________|                                   |
|              |                                                               |
|              |   {V} Funnel                                                  |
|              |   __________________________________________________________  |
|              |   | [CONSENSUS]: All models agree the result is 12.75.     |  |
|______________|   |________________________________________________________|  |
| (•) Miles M. |   __________________________________________________________  |
| [Settings]   |   | [+] [ Type your prompt here...                ] [Mic] [->]| |
|______________|___|___________________________________________________________|_|
```

```
Legend: ₒ(●)• [Name] = Version Badge (ₒ, Bottom-L), Avatar Icon (●), Status (•, Bottom-R)
{V} Funnel = Funnel SVG Icon and "Funnel" username
(:) = Three-dot menu (Visible on Hover)
```

## Layout Components

### 1. Unified Group Chat Interface

- **Mobile Aesthetic**: Emulates iMessage/WhatsApp, Discord, and Google Messages.
- **Sticky Dates**: A subtle visual separator line (e.g., "Today", "January 18, 2022") divides the chat history by day.
- **Message Bubbles**:
  - **User**: Right-aligned. Sent message "floats up" from the input bar to the chat history.
  - **LLMs**: Left-aligned. Include a subtle hover state revealing "Copy" or "Quote/Reply" actions.
- **Message Timestamps**: Localized timestamps placed subtly to the right of each bubble or above the grouping.
- **LLM Avatars & Indicators**:
  - **Masking/Cutout**: Both corner indicators (Version and Status) should sit within a circular **mask (cutout)** that "takes a chunk out" of the main LLM avatar. This mask uses the container's background color (#0F0F0F) as a thick border to ensure legibility and a layered, premium look.
  - **Version Badge**: Tiny circle containing version text, positioned in the **bottom-left** cutout.
  - **Status Indicator**: Discord-style status dot positioned in the **bottom-right** cutout.
    - 🟢 **Green (Online)**: Connection active; solid fill.
    - 🟡 **Yellow (Idle)**: Solid fill (Idle/Throttled state).
    - ⚪ **Gray (Offline)**: Hollow gray ring. Due to the **Masking/Cutout**, the center of the ring reveals the app background, not the avatar icon.
    - 🔴 **Red (Action Required)**: Pulsing ring indicating a captcha or "Verify you are human" wall in the target tab.
  - **Identity**: The model's full name (e.g., "GPT-5.4 Thinking", "Gemini 3.1 Pro") is displayed in a clean, semi-bold font to the right of the icon/badge block.
- **Group Settings Sidebar (Top Header Action)**:
  - Tapping the top-center group name (e.g., "Funnel Council") opens a Right-Hand Sidebar.
  - Contains a **Search** function, a **Gallery** row for generated assets, and a **Members List** of active LLMs.
  - **"Add LLMs" Button**: Replacing standard "Add People", clicking this opens a search overlay and instantiates a new background tab to the selected LLM's URL.
  - **External Constraints**: Since incognito/guest tabs often lock manual model versions, users cannot "swap" a tab's internal model; they must add a new "Participant" via the "Add LLMs" button.
- **Thinking & Streaming States**:
  - If a model has a native "Chain of Thought" (e.g., DeepSeek R1), it displays a "Brain" or "Chevron" icon.
  - **Collapsed by Default**: The actual streaming response (and native CoT) must be collapsed by default to keep the feed clean. It shows only the first ~15-20 characters followed by a grayed-out `"Read more..."` and a pulsing `...` triple-dot typing animation. 
  - The triple-dot animation persists until the stream is complete, at which point it becomes static `"Read more..."` text. Expanding reveals the full output.
- **LaTeX Rendering**:
  - Native support for inline (`$...$`) and block (`$$...$$`) LaTeX.
  - Specifically optimized to render `\boxed{}` and `\fbox{}` commands used for final answers.

### 2. Sidebar (Left)

- **Chat History**: A list of previous conversations, each representing a distinct "LLM Group Chat". Available only to logged-in users.
- **Folders (Auth-Only)**: Collapsible categories to organize chats (e.g., [ SCHOOL ], [ WORK ]). This feature is hidden/locked when logged out.
- **Item Management (Hover State)**:
  - By default, the item shows just the chat title.
  - On **Hover**, a vertical three-dot (`⋮`) icon fades in at the right edge of the item.
  - **Clicking the Dots**: Opens a context menu with options to:
  * **Rename**: Inline text entry to change the title.
  * **Delete**: Remove the chat from history.
  * **Move**: Organize the chat into project-specific folders.
- **Login Prompt**: If the user is logged out, the sidebar hides the chat list and folders, showing instead a call to action: "Sign in to save and manage your chat history."
- **User Footer**: Located at the bottom-left. Shows "(•) Guest" when logged out and the "User Profile Icon/Name" when logged in, alongside a Settings cogwheel.

### 3. The Funnel Synthesis (Consensus Hub)
- **Consensus Bubble**: Displays a 'Confidence Meter' (Green for 100%, Yellow for >50%).
- **The Tally View**: Shows unique answers with model icons grouped beneath them (e.g., 'Answer B: [GPT Icon] [Claude Icon] - 2 Votes').
- **Conflict Resolution (Split Decision)**: If the models are deadlocked (e.g., 2 say A, 2 say B), the Funnel displays a "Split Decision" state and prompts the user: *"The council is split. Would you like me to ask a tie-breaking clarifying question?"* with a quick-action button.
- **Extraction Logic**: Uses Regex to find 'Answer: [X]' and 'boxed{}' strings for immediate display.

### 4. Input Command Center

- **Aesthetic**: Floating input bar with a subtle glow.
- **Functionality**:
  - `+` Icon: Upload files/images.
  - `Mic` Icon: Speech transcription.
  - `Airplane` Icon: Send prompt with "float up" animation.
  - `Stop` Icon: A dynamic "Stop All" mechanism to halt all active tab streams manually, minimizing token waste (also auto-triggers when majority is reached).
  - **Targeted Mentions**: Typing `@` opens an autocomplete dropdown of active LLMs to direct a prompt to one specific model. Basic NLP detects implicit targeting (e.g., "What does Claude think?") if `@` is omitted.

## Micro-animations

- **Arrival**: Model responses should "fade and slide" upwards as they appear.
- **Thinking State**: A pulse animation around the model's icon while the extension is waiting for the response from the tab.
- **Hover Effects**: Sublte scale-up and border-glow on side-bar conversation items.
