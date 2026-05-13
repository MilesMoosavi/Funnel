"use client";

import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { CodeBlock } from "./CodeBlock";

interface MarkdownRendererProps {
  content: string;
}

/**
 * Renders markdown content with GFM tables/strikethrough, math/LaTeX (KaTeX),
 * and syntax-highlighted code blocks (via CodeBlock).
 * Blank lines are replaced with non-breaking spaces to preserve visual spacing
 * inside chat bubbles.
 */
export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  // Replace empty lines with NBSP so ReactMarkdown doesn't collapse them
  const processedContent = content
    .split("\n")
    .map((line) => (line === "" ? "\u00A0" : line))
    .join("\n");

  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm, remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: ({ ...props }) => (
          <p className="m-0" style={{ whiteSpace: "pre-wrap" }} {...props} />
        ),
        h1: ({ ...props }) => (
          <h1 className="m-0 text-2xl font-bold" {...props} />
        ),
        h2: ({ ...props }) => (
          <h2 className="m-0 text-xl font-bold" {...props} />
        ),
        h3: ({ ...props }) => (
          <h3 className="m-0 text-lg font-bold" {...props} />
        ),
        h4: ({ ...props }) => (
          <h4 className="m-0 text-base font-bold" {...props} />
        ),
        ul: ({ ...props }) => (
          <ul className="m-0 p-0 list-disc ml-6" {...props} />
        ),
        ol: ({ ...props }) => (
          <ol className="m-0 p-0 list-decimal ml-6" {...props} />
        ),
        code: ({
          className,
          children,
          ...props
        }: React.HTMLAttributes<HTMLElement>) => {
          // Fenced code blocks have a language-* class from remark
          const match = /language-(\w+)/.exec(className || "");
          if (match) {
            return (
              <CodeBlock
                language={match[1]}
                codeString={String(children).replace(/\n$/, "")}
              />
            );
          }
          // Inline code
          return (
            <code
              className="px-1 rounded text-[13px] font-mono opacity-80"
              {...props}
            >
              {children}
            </code>
          );
        },
        // Strip the <pre> wrapper so CodeBlock controls its own container
        pre: ({ children }) => <>{children}</>,
      }}
    >
      {processedContent}
    </ReactMarkdown>
  );
}
