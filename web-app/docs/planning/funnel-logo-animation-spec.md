# Funnel Logo Animation UI Spec (Strict Version)

This specification defines the behavior of the "Funnel" (F) icon as it transitions between the Landing Screen and the Chat History. 

## The "Single Identity" Principle
The "F" icon represents a single identity that "travels" between the center of the screen and the chat avatars. At no point should there be a visible "duplicate" F icon or an "empty" avatar shell during the flight.

## Phase 1: Fly-In (Initiating Chat)
**Trigger:** 1st message sent by user.
- **Source:** Center Logo "F" (`NewChatScreen`).
- **Destination:** Avatar "F" of the **first** Funnel LLM response.
- **Constraint:** The flight must be fully opaque (no fading).
- **No Slide:** The F must fly straight from the center to its destination.

## Phase 2: Subsequent Messages
**Trigger:** 2nd, 3rd, ... messages from Funnel LLM.
- **Behavior:** These avatars must **pop into existence** instantly.
- **Strict Constraint (No Slide):** There must be **zero** visible movement/sliding of the "F" icon from the previous message's avatar to the new one. They are individual instances that do not "hand over" the logo with a visible travel animation.

## Phase 3: Fly-Out (New Chat Reset)
**Trigger:** User clicks "New Chat" button.
- **Source:** Avatar "F" of the **most recent VISIBLE** Funnel LLM response in the user's viewport.
- **Hidden State Fallback:** If the user has scrolled such that NO Funnel LLM responses are currently visible in the viewport, the fly-out animation is aborted. The center logo will simply fade/scale in locally.
- **Destination:** Center Logo "F" (`NewChatScreen`).
- **Strict Constraint:** The F must fly out from its visible position directly to the center.
- **No Ghosting:** As the F flies out, the entire avatar container must participate in the flight, leaving NO "empty shell" behind.

## Implementation Rules
1. Use `layoutId="funnel-logo"` to link the center logo and the chat avatars.
2. To prevent "sliding" between message bubbles:
   - Use a transition where the `layout` duration is **0.5s** ONLY when flying to/from the center.
   - The "handover" between consecutive message avatars must have a `layout` duration of **0s** to make the shift invisible.
3. Keep all flight transitions fully opaque (`opacity: 1`) on both `initial` and `exit` states.
