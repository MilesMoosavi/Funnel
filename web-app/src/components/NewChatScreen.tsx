"use client";

import { motion } from "framer-motion";
import { Logo } from "./ui/Logo";

const DEBUG_DURATION_MULTIPLIER = 2;

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
    exit: {
      opacity: 1, // STRICT COMPLIANCE: Keep fully opaque for flight
      y: 0,
      transition: { duration: 0.3 } // RESTORED: Give the child logo time to fly out before destroying the container
    }
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
    exit: {
      // Hide the source instantly to prevent the ghosting effect
      opacity: 1, 
      scale: 1,
      transition: { duration: 0 }
    }
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
          delay: 0.6,
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
    exit: {
      opacity: 0,
      x: 20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      key="new-chat-screen"
      variants={container}
      initial="hidden"
      animate="show"
      exit="exit"
      className="flex flex-col items-center justify-center w-full px-8"
    >
      <motion.div layout className="flex items-center justify-center">
        {/* Funnel Logo */}
        <motion.div
          variants={logoVariants}
          layoutId="funnel-logo"
          transition={{
            duration: 0.5 * DEBUG_DURATION_MULTIPLIER,
            ease: [0.16, 1, 0.3, 1]
          }}
          style={{
            width: "3.5rem",
            height: "3.5rem",
            color: "var(--text-primary)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
            opacity: 1, // Force opacity
          }}
        >
          <Logo color="#FFFFFF" />
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
