"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  isExtensionAvailable,
  performHandshake,
  type HandshakeResponse,
} from "@/lib/extension";

type ConnectionState = "checking" | "connected" | "disconnected" | "error";

interface ExtensionStatusProps {
  uid: string;
  minimal?: boolean;
}

export default function ExtensionStatus({ uid, minimal }: ExtensionStatusProps) {
  const [state, setState] = useState<ConnectionState>("checking");
  const [response, setResponse] = useState<HandshakeResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    async function tryHandshake() {
      if (!isExtensionAvailable()) {
        setState("disconnected");
        setErrorMsg("Extension not detected");
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

    const timer = setTimeout(tryHandshake, 500);
    return () => clearTimeout(timer);
  }, [uid]);

  const statusConfig = {
    checking: {
      color: "var(--status-idle)",
      label: "Checking...",
      description: "Searching for extension",
    },
    connected: {
      color: "var(--status-connected)",
      label: "Connected",
      description: response?.extensionVersion
        ? `v${response.extensionVersion}`
        : "Link active",
    },
    disconnected: {
      color: "var(--status-disconnected)",
      label: "Disconnected",
      description: errorMsg || "Extension missing",
    },
    error: {
      color: "var(--status-attention)",
      label: "Error",
      description: errorMsg || "Handshake failed",
    },
  };

  const config = statusConfig[state];

  // If minimal is NOT requested, show the full chip statically
  if (!minimal) {
    return (
      <div
        className="flex items-center gap-3 px-4 py-2.5 rounded-xl shrink-0"
        style={{
          background: "var(--bg-glass)",
          border: "1px solid var(--border-subtle)",
          backdropFilter: "blur(16px)",
          width: "100%",
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
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
      animate={{
        width: isHovered ? "auto" : 28,
        backgroundColor: isHovered ? "var(--bg-glass)" : "transparent",
        borderColor: isHovered ? "var(--border-subtle)" : "transparent",
      }}
      initial={false}
      transition={{ type: "spring", stiffness: 350, damping: 32 }}
      className="flex items-center justify-end overflow-hidden rounded-xl border border-transparent h-8 cursor-pointer relative"
      style={{
        backdropFilter: isHovered ? "blur(12px)" : "none",
        paddingRight: isHovered ? 12 : 10,
        paddingLeft: isHovered ? 12 : 0,
      }}
    >
      {/* Content area: Unrolls to the left of the dot */}
      <AnimatePresence initial={false}>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, x: 20, width: 0 }}
            animate={{ opacity: 1, x: 0, width: "auto" }}
            exit={{ opacity: 0, x: 10, width: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col pr-3 whitespace-nowrap overflow-hidden"
          >
            <span className="text-[10px] font-bold leading-tight" style={{ color: config.color }}>
              {config.label}
            </span>
            <span className="text-[9px] leading-tight" style={{ color: "var(--text-tertiary)" }}>
              {config.description}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Indicator (Persistent Dot) */}
      <motion.div layout className="shrink-0 flex items-center justify-center" style={{ width: 12 }}>
        <StatusDot state={state} color={config.color} />
      </motion.div>
    </motion.div>
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
