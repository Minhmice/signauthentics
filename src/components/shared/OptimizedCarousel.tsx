/**
 * OptimizedCarousel - High-performance base carousel component
 * Features: Parallax, Blur Momentum, Gesture Velocity, Smooth Snap, Stagger Animation
 * Performance: GPU acceleration, will-change, lazy rendering
 */

"use client";

import * as React from "react";
import { motion, Variants } from "framer-motion";
import { CarouselNavigation } from "./CarouselNavigation";
import { FadeOverlay } from "./FadeOverlay";
import { CarouselCardSkeleton } from "./AnimatedSkeleton";
import { useEnhancedCarousel } from "@/hooks/useEnhancedCarousel";
import { useScrollReveal } from "@/hooks/useScrollReveal";

type OptimizedCarouselProps<T> = {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
  cardWidth: number;
  gap?: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  showNavigation?: boolean;
  showNavigationOnMobile?: boolean;
  title?: string;
  className?: string;
  cardClassName?: string;
  enableParallax?: boolean;
  enableBlur?: boolean;
  enableGestureVelocity?: boolean;
  enableSmoothSnap?: boolean;
  enableStagger?: boolean;
  enableScrollReveal?: boolean;
  scrollRevealOptions?: {
    stagger?: number;
    duration?: number;
    from?: { opacity?: number; y?: number; scale?: number };
    ease?: string;
  };
  isLoading?: boolean;
  skeletonCount?: number;
  fadeWidth?: string;
};

// Stagger animation variants
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.1
    }
  }
};

const itemVariants: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24
    }
  }
};

export function OptimizedCarousel<T>({
  items,
  renderItem,
  cardWidth,
  gap = 24,
  autoPlay = false,
  autoPlayInterval = 5000,
  showNavigation = true,
  showNavigationOnMobile = false,
  title,
  className = "",
  cardClassName = "",
  enableParallax = true,
  enableBlur = true,
  enableGestureVelocity = true,
  enableSmoothSnap = true,
  enableStagger = false, // Disable Framer stagger when using GSAP
  enableScrollReveal = true, // Enable GSAP ScrollTrigger by default
  scrollRevealOptions = {},
  isLoading = false,
  skeletonCount = 5,
  fadeWidth = "w-8"
}: OptimizedCarouselProps<T>) {
  const {
    currentIndex,
    infiniteItems,
    x,
    blur,
    controls,
    isDragging,
    goToNext,
    goToPrevious,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    getParallaxStyle,
    shouldReduceMotion
  } = useEnhancedCarousel({
    items,
    cardWidth: cardWidth + gap,
    autoPlay,
    autoPlayInterval,
    enableParallax,
    enableBlur,
    enableGestureVelocity,
    enableSmoothSnap
  });

  // GSAP ScrollTrigger for reveal animations
  const { containerRef, registerCard } = useScrollReveal({
    enabled: enableScrollReveal && !shouldReduceMotion,
    stagger: scrollRevealOptions.stagger ?? 0.08,
    duration: scrollRevealOptions.duration ?? 0.8,
    from: scrollRevealOptions.from ?? { opacity: 0, y: 60, scale: 0.95 },
    ease: scrollRevealOptions.ease ?? "power3.out",
    once: true,
  });

  // Loading state
  if (isLoading) {
    return (
      <div className={className}>
        {title && showNavigation && (
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {title}
            </h2>
          </div>
        )}
        <div className="flex gap-6 overflow-hidden">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <div key={i} style={{ width: cardWidth, flexShrink: 0 }}>
              <CarouselCardSkeleton />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={className} ref={containerRef}>
      {/* Header with Navigation */}
      {title && showNavigation && (
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            {title}
          </h2>
          <CarouselNavigation 
            onPrevious={goToPrevious} 
            onNext={goToNext} 
            showOnMobile={showNavigationOnMobile} 
          />
        </div>
      )}
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex"
          style={{ 
            x,
            gap: `${gap}px`,
            cursor: isDragging ? 'grabbing' : 'grab',
            filter: enableBlur ? blur : undefined,
            willChange: 'transform', // Performance optimization
            transform: 'translateZ(0)' // Force GPU acceleration
          }}
          animate={controls}
          variants={enableStagger ? containerVariants : undefined}
          initial={enableStagger ? "hidden" : undefined}
          whileInView={enableStagger ? "visible" : undefined}
          viewport={{ once: true, amount: 0.2 }}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
        >
          {infiniteItems.map((item, index) => (
            <motion.div
              key={`carousel-item-${index}`}
              ref={enableScrollReveal ? registerCard(index) : undefined}
              className={cardClassName}
              style={{
                width: cardWidth,
                flexShrink: 0,
                willChange: 'transform', // Performance hint
                ...(!shouldReduceMotion && enableParallax ? getParallaxStyle(index) : {})
              }}
              variants={enableStagger ? itemVariants : undefined}
              whileHover={!shouldReduceMotion ? { 
                y: -8,
                transition: { type: "spring", stiffness: 400, damping: 17 }
              } : undefined}
            >
              {renderItem(item, index)}
            </motion.div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays */}
        <FadeOverlay width={fadeWidth} />
      </div>
    </div>
  );
}

