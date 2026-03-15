import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "FunnelLM",
  description:
    "Orchestrate multiple AI models into a single consensus-driven group chat. Parallel prompting, real-time majority vote detection, and unified synthesis.",
  keywords: [
    "LLM",
    "AI",
    "consensus",
    "ChatGPT",
    "Claude",
    "Gemini",
    "group chat",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
