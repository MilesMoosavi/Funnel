/**
 * Funnel — Background Service Worker
 *
 * The "Brain" of the extension. Responsibilities:
 * 1. Receive AUTH_HANDSHAKE from the Web App (via externally_connectable)
 * 2. Maintain state of active LLM tabs (Tab Heartbeat)
 * 3. Relay prompts from the Web App to Content Scripts
 * 4. Relay scraped responses back to the Web App
 *
 * Batch 1 Focus: Auth Handshake only.
 */

const EXTENSION_VERSION = "0.1.0";

// ============================================================
// State
// ============================================================

/** Stores the authenticated Web App session */
let connectedSession = {
  uid: null,
  timestamp: null,
  tabId: null, // the tab ID of the Web App
};

/** Active LLM tabs being tracked */
const activeTabs = new Map(); // tabId → { url, model, status, lastSeen }

// ============================================================
// External Message Listener (from Web App)
// ============================================================

chrome.runtime.onMessageExternal.addListener(
  (message, sender, sendResponse) => {
    console.log("[Funnel BG] Received external message:", message);
    console.log("[Funnel BG] From sender:", sender);

    switch (message.type) {
      case "AUTH_HANDSHAKE":
        handleAuthHandshake(message, sender, sendResponse);
        return true; // Keep message channel open for async response

      case "SUBMIT_PROMPT":
        // Batch 2: Will dispatch to content scripts
        sendResponse({ status: "NOT_IMPLEMENTED", message: "Coming in Batch 2" });
        return true;

      case "GET_ACTIVE_TABS":
        sendResponse({
          status: "OK",
          tabs: Array.from(activeTabs.entries()).map(([id, data]) => ({
            tabId: id,
            ...data,
          })),
        });
        return true;

      default:
        sendResponse({ status: "UNKNOWN_MESSAGE_TYPE" });
        return false;
    }
  }
);

// ============================================================
// Internal Message Listener (from Content Scripts)
// ============================================================

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("[FunnelLM BG] Internal message:", message);

  switch (message.type) {
    case "CONTENT_SCRIPT_READY":
      // Register this tab as an active LLM tab
      if (sender.tab?.id) {
        activeTabs.set(sender.tab.id, {
          url: sender.tab.url,
          model: detectModel(sender.tab.url),
          status: "online",
          lastSeen: Date.now(),
        });
        console.log(
          `[FunnelLM BG] Registered LLM tab: ${sender.tab.id} (${detectModel(sender.tab.url)})`
        );
        sendResponse({ status: "REGISTERED" });
      }
      return true;

    default:
      return false;
  }
});

// ============================================================
// Auth Handshake Handler
// ============================================================

function handleAuthHandshake(message, sender, sendResponse) {
  const { uid, timestamp } = message;

  if (!uid) {
    sendResponse({
      status: "ERROR",
      error: "Missing UID in handshake payload",
    });
    return;
  }

  connectedSession = {
    uid,
    timestamp,
    tabId: sender.tab?.id || null,
  };

  // Persist to chrome.storage for Service Worker restarts
  chrome.storage.local.set({ funnellm_session: connectedSession });

  console.log(`[FunnelLM BG] ✅ Handshake complete. UID: ${uid}`);

  sendResponse({
    status: "CONNECTED",
    extensionVersion: EXTENSION_VERSION,
  });
}

// ============================================================
// Tab Heartbeat — Track open/closed LLM tabs
// ============================================================

chrome.tabs.onRemoved.addListener((tabId) => {
  if (activeTabs.has(tabId)) {
    console.log(`[FunnelLM BG] Tab closed: ${tabId}`);
    activeTabs.delete(tabId);
  }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading" && activeTabs.has(tabId)) {
    // Tab is navigating away — check if still an LLM domain
    const model = detectModel(tab.url);
    if (!model) {
      activeTabs.delete(tabId);
      console.log(`[FunnelLM BG] Tab ${tabId} navigated away from LLM domain`);
    }
  }
});

// ============================================================
// Model Detection (URL → Model Name)
// ============================================================

const MODEL_PATTERNS = [
  { pattern: /chat\.openai\.com|chatgpt\.com/, model: "ChatGPT" },
  { pattern: /claude\.ai/, model: "Claude" },
  { pattern: /gemini\.google\.com/, model: "Gemini" },
  { pattern: /chat\.deepseek\.com/, model: "DeepSeek" },
  { pattern: /perplexity\.ai/, model: "Perplexity" },
  { pattern: /meta\.ai/, model: "Meta AI" },
  { pattern: /grok\.com|x\.com\/i\/grok/, model: "Grok" },
];

function detectModel(url) {
  if (!url) return null;
  for (const { pattern, model } of MODEL_PATTERNS) {
    if (pattern.test(url)) return model;
  }
  return null;
}

// ============================================================
// Service Worker Lifecycle
// ============================================================

chrome.runtime.onInstalled.addListener((details) => {
  console.log(`[FunnelLM BG] Extension installed (${details.reason})`);

  // Restore session from storage if service worker was restarted
  chrome.storage.local.get("funnellm_session", (data) => {
    if (data.funnellm_session) {
      connectedSession = data.funnellm_session;
      console.log(
        `[FunnelLM BG] Restored session: UID ${connectedSession.uid}`
      );
    }
  });
});
