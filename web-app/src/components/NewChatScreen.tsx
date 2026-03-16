"use client";

import { motion } from "framer-motion";

export default function NewChatScreen() {
  const container = {
    hidden: { opacity: 0, y: 12 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    show: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  const titleVariants = {
    hidden: { 
      opacity: 0, 
      width: 0, 
      marginLeft: 0,
      x: -10 
    },
    show: {
      opacity: 1,
      width: "auto",
      marginLeft: -14,
      x: 0,
      transition: {
        width: {
          delay: 0.6, // 0.5 (logo duration) + 0.1 (pause)
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
        marginLeft: {
          delay: 0.6,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
        opacity: {
          delay: 0.6,
          duration: 0.8,
        },
        x: {
          delay: 0.6,
          duration: 0.8,
          ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
      },
    },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center justify-center w-full px-8"
    >
      <motion.div layout className="flex items-center justify-center">
        {/* Funnel Logo */}
        <motion.div
          variants={logoVariants}
          layout
          style={{
            width: 56,
            height: 56,
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            top: -7,
          }}
        >
          <svg
            viewBox="0 0 400 400"
            width="100%"
            height="100%"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill="#FFFFFF"
              fillRule="evenodd"
              d="m 45 31 l 173 304 18 34 19 -34 v -94 l -65 -113 h 109 l 16 -27 h -141 l -25 -43 h 191 l 15 -26 z m 187 281 v -64 l -108 -189 h -38 z"
            />
          </svg>
        </motion.div>

        {/* Main Title */}
        <motion.h1
          variants={titleVariants}
          className="text-3xl font-semibold tracking-tight"
          style={{
            color: "var(--text-primary)",
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          unnel
        </motion.h1>
      </motion.div>
    </motion.div>
  );
}
