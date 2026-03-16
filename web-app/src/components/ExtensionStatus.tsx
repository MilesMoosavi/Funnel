"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  isExtensionAvailable,
  performHandshake,
  type HandshakeResponse,
} from "@/lib/extension";

export type ConnectionState = "connected" | "disconnected" | "error";

interface ExtensionStatusProps {
  uid: string;
  minimal?: boolean;
  onStateChange?: (state: ConnectionState) => void;
}

export default function ExtensionStatus({ uid, minimal, onStateChange }: ExtensionStatusProps) {
  const [state, setState] = useState<ConnectionState>("disconnected");
  const [response, setResponse] = useState<HandshakeResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function tryHandshake() {
      if (!isExtensionAvailable()) {
        setState("disconnected");
        setErrorMsg("Click to install");
        return;
      }

      try {
        const res = await performHandshake(uid);
        setResponse(res);
        setState(res.status === "CONNECTED" ? "connected" : "error");
      } catch (err) {
        setState("disconnected");
        setErrorMsg(err instanceof Error ? err.message : "Connection failed");
      }
    }

    tryHandshake();
  }, [uid]);

  useEffect(() => {
    if (onStateChange) {
      onStateChange(state);
    }
  }, [state, onStateChange]);

  const statusConfig = {
    connected: {
      color: "var(--status-connected)",
      label: "Connected",
      description: response?.extensionVersion
        ? `v${response.extensionVersion}`
        : "Link active",
    },
    disconnected: {
      color: "var(--status-disconnected)",
      label: "No extension",
      description: errorMsg || "Extension missing",
    },
    error: {
      color: "var(--status-attention)",
      label: "Error",
      description: errorMsg || "Handshake failed",
    },
  };

  const config = statusConfig[state];

  const extensionStoreUrl = "https://chrome.google.com/webstore/search/funnel";

  const handleClick = () => {
    if (state === "disconnected" || state === "error") {
      window.open(extensionStoreUrl, "_blank");
    }
  };

  // If minimal is NOT requested, show the full chip statically
  if (!minimal) {
    return (
      <div
        onClick={handleClick}
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl shrink-0 cursor-pointer"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          width: "auto",
          maxWidth: 260,
        }}
      >
        <StatusDot state={state} color={config.color} />
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-semibold leading-tight truncate" style={{ color: config.color }}>
            {config.label}
          </span>
          <span className="text-[10px] leading-tight truncate" style={{ color: "var(--text-tertiary)" }}>
            {config.description}
          </span>
        </div>
      </div>
    );
  }

  // Minimal version with persistent dot and liquid-smooth sliding reveal
  return (
    <div className="flex items-center justify-center" style={{ width: 28, height: 28 }}>
      <StatusDot state={state} color={config.color} />
    </div>
  );
}

function StatusDot({ state, color }: { state: ConnectionState; color: string }) {
  return (
    <div className="relative flex items-center justify-center">
      <AnimatePresence mode="popLayout">
        <motion.div
          key={state}
          layoutId="status-dot-core"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
          className="absolute"
        />
      </AnimatePresence>
      <div style={{ width: 8, height: 8 }} /> {/* Spacer for absolute dot */}
      
      {state === "connected" && (
        <motion.div
          animate={{
            scale: [1, 2.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
          style={{
            position: "absolute",
            width: 8,
            height: 8,
            borderRadius: "50%",
            backgroundColor: color,
          }}
        />
      )}
    </div>
  );
}
