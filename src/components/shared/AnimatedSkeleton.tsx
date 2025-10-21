/**
 * AnimatedSkeleton - Loading skeleton with shimmer animation
 * Performance-optimized with GPU acceleration
 */

"use client";

import { motion } from "framer-motion";

type AnimatedSkeletonProps = {
  width?: string;
  height?: string;
  className?: string;
  variant?: "card" | "text" | "circle" | "custom";
};

export function AnimatedSkeleton({ 
  width = "100%", 
  height = "20px",
  className = "",
  variant = "custom"
}: AnimatedSkeletonProps) {
  const variantClasses = {
    card: "w-full h-64 rounded-2xl",
    text: "w-full h-4 rounded",
    circle: "w-12 h-12 rounded-full",
    custom: ""
  };

  return (
    <motion.div
      className={`bg-zinc-200 dark:bg-zinc-800 overflow-hidden relative ${variantClasses[variant]} ${className}`}
      style={{ width: variant === "custom" ? width : undefined, height: variant === "custom" ? height : undefined }}
      animate={{
        opacity: [0.5, 1, 0.5],
      }}
      transition={{
        repeat: Infinity,
        duration: 1.5,
        ease: "easeInOut",
      }}
    >
      {/* Shimmer effect */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-white/10 to-transparent"
        animate={{
          x: ["-100%", "100%"],
        }}
        transition={{
          repeat: Infinity,
          duration: 1.5,
          ease: "linear",
        }}
        style={{ willChange: "transform" }}
      />
    </motion.div>
  );
}

// Card skeleton variants
export function CarouselCardSkeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`space-y-4 ${className}`}>
      <AnimatedSkeleton variant="card" />
      <AnimatedSkeleton variant="text" className="w-3/4" />
      <AnimatedSkeleton variant="text" className="w-1/2" />
    </div>
  );
}

