/**
 * AnimatedCard - Wrapper component for cards with smooth hover animations
 * Provides consistent animation behavior across all card types
 */

"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

type AnimatedCardProps = {
  children: ReactNode;
  className?: string;
  enableHover?: boolean;
};

export function AnimatedCard({ 
  children, 
  className = "",
  enableHover = true 
}: AnimatedCardProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
      whileHover={enableHover ? {
        y: -8,
        transition: {
          type: "spring",
          stiffness: 400,
          damping: 17
        }
      } : undefined}
    >
      {children}
    </motion.div>
  );
}

