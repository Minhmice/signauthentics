/**
 * useInfiniteCarousel - Custom hook for infinite carousel logic
 * Creates seamless infinite scroll by duplicating items
 */

import { useState, useMemo, useEffect } from "react";
import { useMotionValue } from "framer-motion";

type UseInfiniteCarouselProps<T> = {
  items: T[];
  cardWidth: number;
  autoPlay?: boolean;
  autoPlayInterval?: number;
  onIndexChange?: (index: number) => void;
};

export function useInfiniteCarousel<T>({ 
  items, 
  cardWidth,
  autoPlay = false,
  autoPlayInterval = 5000,
  onIndexChange
}: UseInfiniteCarouselProps<T>) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const x = useMotionValue(0);

  // Create infinite scroll data by triplicating items
  const infiniteItems = useMemo(() => {
    return [...items, ...items, ...items];
  }, [items]);

  const containerWidth = cardWidth * items.length;

  // Calculate current position for infinite scroll
  const currentPosition = useMemo(() => {
    return -currentIndex * cardWidth - containerWidth;
  }, [currentIndex, cardWidth, containerWidth]);

  // Navigation functions
  const goToNext = () => {
    const newIndex = (currentIndex + 1) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const goToPrevious = () => {
    const newIndex = (currentIndex - 1 + items.length) % items.length;
    setCurrentIndex(newIndex);
    onIndexChange?.(newIndex);
  };

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    onIndexChange?.(index);
  };

  // Auto-play functionality
  useEffect(() => {
    if (!autoPlay || isPaused) return;

    const interval = setInterval(() => {
      goToNext();
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [autoPlay, isPaused, autoPlayInterval, currentIndex]);

  return {
    currentIndex,
    infiniteItems,
    currentPosition,
    x,
    goToNext,
    goToPrevious,
    goToIndex,
    isPaused,
    setIsPaused
  };
}

