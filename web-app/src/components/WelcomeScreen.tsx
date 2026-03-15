"use client";

import { motion } from "framer-motion";

export default function WelcomeScreen() {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center w-full px-8"
    >
      <motion.div variants={item} className="flex items-center gap-3">
        {/* Funnel Logo */}
        <div style={{ width: 56, height: 56, color: "var(--text-primary)" }}>
          <svg
            viewBox="-40 -40 500 500"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path fill="currentColor" fillRule="evenodd" d="M55 82l173 304h37v-94l-65-113h109l16-27H184l-25-43h191l15-26z M242 363v-64L134 110H96z" />
          </svg>
        </div>
        
        {/* Main Title */}
        <h1
          className="text-3xl font-semibold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          FunnelLM
        </h1>
      </motion.div>
    </motion.div>
  );
}
