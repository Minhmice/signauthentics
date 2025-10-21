/**
 * useEnhancedCarousel - All-in-one carousel hook with advanced animations
 * Features: Parallax, Blur Momentum, Gesture Velocity, Smooth Snap, Stagger
 */

"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useMotionValue, useVelocity, useTransform, useAnimation, useReducedMotion } from "framer-motion";

type UseEnhancedCarouselProps<T> = {
  items: T[];
  cardWidth: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  enableParallax?: boolean;
  enableBlur?: boolean;
  enableGestureVelocity?: boolean;
  enableSmoothSnap?: boolean;
  onIndexChange?: (index: number) => void;
};

export function useEnhancedCarousel<T>({
  items,
  cardWidth,
  autoPlay = false,
  autoPlayInterval = 5000,
  enableParallax = true,
  enableBlur = true,
  enableGestureVelocity = true,
  enableSmoothSnap = true,
  onIndexChange
}: UseEnhancedCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  
  const controls = useAnimation();
  const x = useMotionValue(0);
  const xVelocity = useVelocity(x);
  
  // Blur effect based on velocity
  const blur = useTransform(
    xVelocity,
    [-3000, 0, 3000],
    enableBlur && !shouldReduceMotion ? ["blur(3px)", "blur(0px)", "blur(3px)"] : ["blur(0px)", "blur(0px)", "blur(0px)"]
  );

  // Create infinite scroll data
  const infiniteItems = useMemo(() => {
    return [...items, ...items, ...items];
  }, [items]);

  const containerWidth = cardWidth * items.length;

  // Calculate current position
  const currentPosition = useMemo(() => {
    return -currentIndex * cardWidth - containerWidth;
  }, [currentIndex, cardWidth, containerWidth]);

  // Gesture velocity constants
  const SWIPE_CONFIDENCE_THRESHOLD = enableGestureVelocity ? 8000 : 15000;
  const SWIPE_POWER = (offset: number, velocity: number) => {
    return Math.abs(offset) * Math.abs(velocity);
  };

  // Navigation functions
  const goToNext = useCallback(() => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, items.length, onIndexChange]);

  const goToPrevious = useCallback(() => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  }, [currentIndex, items.length, onIndexChange]);

  const goToIndex = useCallback((index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  }, [onIndexChange]);

  // Enhanced drag handlers
  const handleDragStart = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  }, []);

  const handleDragMove = useCallback((event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - dragStart;
    setDragOffset(deltaX);
    x.set(currentPosition + deltaX);
  }, [isDragging, dragStart, currentPosition, x]);

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Get velocity for gesture-based navigation
    const velocity = xVelocity.get();
    const swipePower = SWIPE_POWER(dragOffset, velocity);
    
    // Enhanced gesture detection
    if (enableGestureVelocity && swipePower > SWIPE_CONFIDENCE_THRESHOLD) {
      if (dragOffset > 0) {
        goToPrevious();
      } else {
        goToNext();
      }
    } else {
      // Standard threshold detection
      const threshold = cardWidth * 0.3;
      if (Math.abs(dragOffset) > threshold) {
        if (dragOffset > 0) {
          goToPrevious();
        } else {
          goToNext();
        }
      } else {
        // Snap back with smooth animation
        controls.start({ 
          x: currentPosition, 
          transition: shouldReduceMotion 
            ? { duration: 0 }
            : { type: "spring", stiffness: 300, damping: 30 } 
        });
      }
    }
    
    setDragOffset(0);
  }, [isDragging, dragOffset, xVelocity, cardWidth, currentPosition, controls, goToNext, goToPrevious, enableGestureVelocity, shouldReduceMotion, SWIPE_CONFIDENCE_THRESHOLD, SWIPE_POWER]);

  // Smooth scroll snap
  useEffect(() => {
    if (enableSmoothSnap && !isDragging) {
      const unsubscribe = x.on("change", (latest) => {
        const offset = latest + containerWidth;
        const targetIndex = Math.round(-offset / cardWidth);
        const normalizedIndex = ((targetIndex % items.length) + items.length) % items.length;
        
        if (Math.abs(currentIndex - normalizedIndex) > 0 && !isDragging) {
          setCurrentIndex(normalizedIndex);
          onIndexChange?.(normalizedIndex);
        }
      });
      
      return unsubscribe;
    }
  }, [x, currentIndex, cardWidth, containerWidth, items.length, isDragging, enableSmoothSnap, onIndexChange]);

  // Update position when currentIndex changes
  useEffect(() => {
    if (!isDragging) {
      controls.start({ 
        x: currentPosition, 
        transition: shouldReduceMotion
          ? { duration: 0 }
          : { type: "spring", stiffness: 300, damping: 30 } 
      });
    }
  }, [currentIndex, currentPosition, controls, isDragging, shouldReduceMotion]);

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isDragging) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isDragging, autoPlayInterval, goToNext]);

  // Parallax effect calculator
  const getParallaxStyle = useCallback((index: number) => {
    if (!enableParallax || shouldReduceMotion) return {};
    
    const distance = index - currentIndex;
    const parallaxOffset = distance * 10; // Adjust multiplier for effect strength
    
    return {
      transform: `translateX(${parallaxOffset}px)`,
      transition: 'transform 0.3s ease-out'
    };
  }, [currentIndex, enableParallax, shouldReduceMotion]);

  return {
    // State
    currentIndex,
    infiniteItems,
    currentPosition,
    isDragging,
    
    // Motion values
    x,
    xVelocity,
    blur,
    controls,
    
    // Navigation
    goToNext,
    goToPrevious,
    goToIndex,
    
    // Drag handlers
    handleDragStart,
    handleDragMove,
    handleDragEnd,
    
    // Effects
    getParallaxStyle,
    shouldReduceMotion
  };
}

