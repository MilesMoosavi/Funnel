/**
 * Auth Utilities
 *
 * Basic user identity structure for Funnel.
 * In Batch 1, we use a simple guest UID system.
 * Future batches will integrate NextAuth with Firebase/Google providers.
 */

export type UserRole = "guest" | "authenticated";

export interface FunnelUser {
  uid: string;
  displayName: string;
  role: UserRole;
  avatarUrl?: string;
}

/**
 * Generate a simple guest UID.
 * In production this would be replaced by NextAuth session management.
 */
export function generateGuestUID(): string {
  // Use crypto.randomUUID if available, otherwise fallback
  if (typeof crypto !== "undefined" && crypto.randomUUID) {
    return `guest_${crypto.randomUUID().split("-")[0]}`;
  }
  return `guest_${Math.random().toString(36).substring(2, 10)}`;
}

/**
 * Create a guest user object.
 */
export function createGuestUser(): FunnelUser {
  return {
    uid: generateGuestUID(),
    displayName: "Guest",
    role: "guest",
  };
}

/**
 * Get stored user from localStorage, or create a new guest.
 */
export function getOrCreateUser(): FunnelUser {
  if (typeof window === "undefined") {
    return createGuestUser();
  }

  const stored = localStorage.getItem("funnel_user");
  if (stored) {
    try {
      return JSON.parse(stored) as FunnelUser;
    } catch {
      // Corrupted data — create fresh guest
    }
  }

  const guest = createGuestUser();
  localStorage.setItem("funnel_user", JSON.stringify(guest));
  return guest;
}
