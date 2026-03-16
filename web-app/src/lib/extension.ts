/**
 * Extension Communication Layer
 *
 * Handles all communication between the Funnel Web App and
 * the Chrome Extension via chrome.runtime.sendMessage.
 *
 * The Extension ID must match the unpacked extension loaded in Chrome.
 * During development, this is set after loading the extension.
 */

// The Extension ID — set after loading the unpacked extension in chrome://extensions
// In production, this will be the published Chrome Web Store extension ID.
const EXTENSION_ID = process.env.NEXT_PUBLIC_EXTENSION_ID || "";

export interface HandshakeResponse {
  status: "CONNECTED" | "ERROR";
  extensionVersion?: string;
  error?: string;
}

/**
 * Check if the Chrome Extension API is available in the current browser context.
 */
export function isExtensionAvailable(): boolean {
  if (typeof window === "undefined") return false;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const w = window as any;
  return (
    w.chrome !== undefined &&
    w.chrome.runtime !== undefined &&
    typeof w.chrome.runtime.sendMessage === "function"
  );
}

/**
 * Send a message to the Funnel Chrome Extension background script.
 * Uses chrome.runtime.sendMessage with the externally_connectable pattern.
 */
export async function sendToExtension<T = HandshakeResponse>(
  message: Record<string, unknown>
): Promise<T> {
  if (!isExtensionAvailable()) {
    throw new Error("Chrome Extension API is not available");
  }

  if (!EXTENSION_ID) {
    throw new Error(
      "Extension ID not configured. Set NEXT_PUBLIC_EXTENSION_ID in your .env.local"
    );
  }

  return new Promise((resolve, reject) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const c = (window as any).chrome;
    c.runtime.sendMessage(EXTENSION_ID, message, (response: T) => {
      if (c.runtime.lastError) {
        reject(new Error(c.runtime.lastError.message));
      } else {
        resolve(response);
      }
    });
  });
}

/**
 * Perform the Auth Handshake — sends the session UID to the extension
 * so the background script knows which user profile to sync with.
 */
export async function performHandshake(
  uid: string
): Promise<HandshakeResponse> {
  return sendToExtension<HandshakeResponse>({
    type: "AUTH_HANDSHAKE",
    uid,
    timestamp: Date.now(),
  });
}
