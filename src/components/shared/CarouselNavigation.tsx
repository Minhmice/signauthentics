/**
 * CarouselNavigation - Reusable carousel navigation buttons
 * Shared across PlayersSpotlight, LatestNews, PlayersSlider
 * Enhanced with modern animations and micro-interactions
 */

"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";

type CarouselNavigationProps = {
  onPrevious: () => void;
  onNext: () => void;
  className?: string;
  showOnMobile?: boolean;
};

export function CarouselNavigation({ 
  onPrevious, 
  onNext, 
  className = "",
  showOnMobile = false 
}: CarouselNavigationProps) {
  const containerClass = showOnMobile 
    ? `flex items-center gap-5 ${className}`
    : `hidden md:flex items-center gap-5 ${className}`;

  return (
    <motion.div 
      className={containerClass}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
    >
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={onPrevious}
          className="h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 transition-all duration-200 hover:shadow-lg"
        >
          <motion.div
            whileHover={{ x: -2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronLeft className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        <Button
          variant="outline"
          size="icon"
          onClick={onNext}
          className="h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600 transition-all duration-200 hover:shadow-lg"
        >
          <motion.div
            whileHover={{ x: 2 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <ChevronRight className="h-4 w-4" />
          </motion.div>
        </Button>
      </motion.div>
    </motion.div>
  );
}

