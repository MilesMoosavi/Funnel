/**
 * FunnelLM — Popup Script
 *
 * Queries the background service worker for current state
 * and updates the popup UI.
 */

document.addEventListener("DOMContentLoaded", () => {
  const webappDot = document.getElementById("webapp-dot");
  const webappStatus = document.getElementById("webapp-status");
  const uidDot = document.getElementById("uid-dot");
  const uidValue = document.getElementById("uid-value");
  const tabsList = document.getElementById("tabs-list");

  // Load session from storage
  chrome.storage.local.get("funnellm_session", (data) => {
    const session = data.funnellm_session;

    if (session && session.uid) {
      webappDot.className = "status-dot online";
      webappStatus.textContent = "Connected";
      webappStatus.className = "status-value connected";

      uidDot.className = "status-dot online";
      uidValue.textContent = session.uid.substring(0, 16) + "…";
      uidValue.className = "status-value connected";
      uidValue.title = session.uid;
    } else {
      webappDot.className = "status-dot offline";
      webappStatus.textContent = "Disconnected";
      webappStatus.className = "status-value disconnected";

      uidDot.className = "status-dot offline";
      uidValue.textContent = "—";
      uidValue.className = "status-value disconnected";
    }
  });

  // Query background for active tabs
  chrome.runtime.sendMessage({ type: "GET_ACTIVE_TABS" }, (response) => {
    if (chrome.runtime.lastError) {
      console.warn("[Popup] Error:", chrome.runtime.lastError.message);
      return;
    }

    if (response && response.tabs && response.tabs.length > 0) {
      tabsList.innerHTML = "";

      // Model accent colors
      const modelColors = {
        ChatGPT: "#10A37F",
        Claude: "#D97706",
        Gemini: "#4285F4",
        DeepSeek: "#6366F1",
        Perplexity: "#22D3EE",
        "Meta AI": "#1877F2",
        Grok: "#EF4444",
      };

      response.tabs.forEach((tab) => {
        const item = document.createElement("div");
        item.className = "tab-item";

        const dot = document.createElement("div");
        dot.className = `status-dot ${tab.status === "online" ? "online" : "offline"}`;
        dot.style.background = modelColors[tab.model] || "#6B7280";

        const name = document.createElement("span");
        name.className = "tab-model";
        name.textContent = tab.model || "Unknown";
        name.style.color = modelColors[tab.model] || "#9A9A9A";

        const status = document.createElement("span");
        status.className = "tab-status";
        status.textContent = tab.status;

        item.appendChild(dot);
        item.appendChild(name);
        item.appendChild(status);
        tabsList.appendChild(item);
      });
    }
  });
});
