/**
 * FunnelLM — Content Script (Stub)
 *
 * Injected into LLM provider pages (ChatGPT, Claude, Gemini, etc.)
 * Batch 1: Just announces presence to the background script.
 * Batch 2-3: Will handle DOM injection and MutationObserver scraping.
 */

(function () {
  "use strict";

  // Announce to the background script that this tab is ready
  chrome.runtime.sendMessage(
    { type: "CONTENT_SCRIPT_READY", url: window.location.href },
    (response) => {
      if (chrome.runtime.lastError) {
        console.warn(
          "[FunnelLM CS] Could not connect to background:",
          chrome.runtime.lastError.message
        );
        return;
      }
      console.log("[FunnelLM CS] Registered with background:", response);
    }
  );

  // Listen for future messages from background (prompt dispatch, etc.)
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("[FunnelLM CS] Received message:", message);

    switch (message.type) {
      case "INJECT_PROMPT":
        // Batch 2: Will inject prompt into the LLM input field
        console.log("[FunnelLM CS] INJECT_PROMPT received (not yet implemented)");
        sendResponse({ status: "NOT_IMPLEMENTED" });
        return true;

      default:
        return false;
    }
  });

  console.log("[FunnelLM CS] Content script loaded on:", window.location.hostname);
})();
