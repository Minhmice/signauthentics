/**
 * useCarouselDrag - Custom hook for drag-to-scroll carousel functionality
 * Handles mouse and touch drag events with smooth animations
 */

import { useState, useCallback } from "react";
import { useAnimation, MotionValue } from "framer-motion";

type UseCarouselDragProps = {
  currentPosition: number;
  cardWidth: number;
  onNext: () => void;
  onPrevious: () => void;
};

export function useCarouselDrag({
  currentPosition,
  cardWidth,
  onNext,
  onPrevious,
}: UseCarouselDragProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const controls = useAnimation();

  const handleDragStart = useCallback(
    (event: React.MouseEvent | React.TouchEvent) => {
      setIsDragging(true);
      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      setDragStart(clientX);
      setDragOffset(0);
    },
    []
  );

  const handleDragMove = useCallback(
    (event: React.MouseEvent | React.TouchEvent, x: MotionValue<number>) => {
      if (!isDragging) return;

      const clientX =
        "touches" in event ? event.touches[0].clientX : event.clientX;
      const deltaX = clientX - dragStart;
      setDragOffset(deltaX);
      x.set(currentPosition + deltaX);
    },
    [isDragging, dragStart, currentPosition]
  );

  const handleDragEnd = useCallback(() => {
    if (!isDragging) return;

    setIsDragging(false);
    const threshold = cardWidth * 0.3;

    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        onPrevious();
      } else {
        onNext();
      }
    } else {
      controls.start({
        x: currentPosition,
        transition: { type: "spring", stiffness: 300, damping: 30 },
      });
    }

    setDragOffset(0);
  }, [
    isDragging,
    dragOffset,
    cardWidth,
    currentPosition,
    onNext,
    onPrevious,
    controls,
  ]);

  return {
    isDragging,
    controls,
    handleDragStart,
    handleDragMove,
    handleDragEnd,
  };
}
