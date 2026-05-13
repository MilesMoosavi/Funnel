"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useCopy } from "@/hooks/useCopy";

interface CodeBlockProps {
  language: string;
  codeString: string;
}

export function CodeBlock({ language, codeString }: CodeBlockProps) {
  const [isWrapped, setIsWrapped] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { copied, copy } = useCopy();

  const lineCount = codeString.split("\n").length;

  return (
    <div className="my-2 rounded-lg border border-white/10 overflow-hidden text-left bg-black/20">
      {/* Header Bar */}
      <div className="flex items-center justify-between px-3 py-1.5 border-b border-white/10 bg-white/5">
        <span className="text-[11px] text-white/40 font-mono">{language || "text"}</span>
        <div className="flex items-center gap-1">
          {/* Collapse / Expand */}
          {isCollapsed ? (
            <button
              onClick={() => setIsCollapsed(false)}
              className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              title="Expand"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                <polyline points="17 8 12 3 7 8" />
                <polyline points="17 16 12 21 7 16" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
              title="Collapse"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          )}

          {/* Wrap / Unwrap */}
          <button
            onClick={() => setIsWrapped(!isWrapped)}
            className="p-1 rounded hover:bg-white/10 transition-colors cursor-pointer"
            title={isWrapped ? "Unwrap" : "Wrap"}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/50">
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M3 12h15a3 3 0 1 1 0 6h-4" />
              <polyline points="16 16 14 18 16 20" />
            </svg>
          </button>

          {/* Copy */}
          <button
            onClick={() => copy(codeString)}
            className="flex items-center gap-1 p-1 rounded hover:bg-white/10 transition-colors cursor-pointer min-w-16"
            title="Copy"
          >
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.svg
                  key="check"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/50"
                >
                  <motion.polyline 
                    points="4 12 9 17 20 6" 
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                  />
                </motion.svg>
              ) : (
                <motion.svg
                  key="copy"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-white/50"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </motion.svg>
              )}
            </AnimatePresence>
            <span className="text-[11px] text-white/50">{copied ? "Copied!" : "Copy"}</span>
          </button>
        </div>
      </div>

      {/* Code Body */}
      {isCollapsed ? (
        <div className="px-3 py-2">
          <span className="text-[13px] text-white/30 italic">{lineCount} hidden lines</span>
        </div>
      ) : (
        <pre
          className={`p-3 overflow-x-auto font-mono text-[13px] ${
            isWrapped ? "whitespace-pre-wrap" : "whitespace-pre"
          }`}
        >
          <code>{codeString}</code>
        </pre>
      )}
    </div>
  );
}
