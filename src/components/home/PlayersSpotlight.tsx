"use client";

import * as React from "react";
import { motion, useMotionValue, useTransform, useAnimation } from "framer-motion";
import PlayerCard from "@/components/cards/PlayerCard";
import { players } from "@/lib/mock/players";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlayersSpotlight() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  // Create infinite scroll data by duplicating players
  const infinitePlayers = React.useMemo(() => {
    return [...players, ...players, ...players];
  }, []);
  
  const cardWidth = 280; // 256px + 24px gap
  const containerWidth = cardWidth * players.length;
  
  // Calculate current position for infinite scroll
  const currentPosition = React.useMemo(() => {
    return -currentIndex * cardWidth - containerWidth;
  }, [currentIndex, cardWidth, containerWidth]);
  
  // Handle drag start
  const handleDragStart = (event: React.MouseEvent | React.TouchEvent) => {
    setIsDragging(true);
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    setDragStart(clientX);
    setDragOffset(0);
  };
  
  // Handle drag move
  const handleDragMove = (event: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const clientX = 'touches' in event ? event.touches[0].clientX : event.clientX;
    const deltaX = clientX - dragStart;
    setDragOffset(deltaX);
    
    // Update position with drag offset
    x.set(currentPosition + deltaX);
  };
  
  // Handle drag end
  const handleDragEnd = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    
    // Determine if we should move to next/previous slide
    const threshold = cardWidth * 0.3;
    
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        // Dragged right, go to previous
        goToPrevious();
      } else {
        // Dragged left, go to next
        goToNext();
      }
    } else {
      // Snap back to current position
      controls.start({ x: currentPosition, transition: { type: "spring", stiffness: 300, damping: 30 } });
    }
    
    setDragOffset(0);
  };
  
  // Navigation functions
  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % players.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + players.length) % players.length);
  };
  
  // Update position when currentIndex changes
  React.useEffect(() => {
    if (!isDragging) {
      controls.start({ 
        x: currentPosition, 
        transition: { type: "spring", stiffness: 300, damping: 30 } 
      });
    }
  }, [currentIndex, currentPosition, controls, isDragging]);
  
  // Auto-play (optional)
  React.useEffect(() => {
    const interval = setInterval(() => {
      if (!isDragging) {
        goToNext();
      }
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isDragging]);
  
  return (
    <div className="relative">
      {/* Navigation Buttons */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
          Cầu thủ nổi bật
        </h2>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={goToPrevious}
            className="h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={goToNext}
            className="h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Carousel Container */}
      <div className="relative overflow-hidden">
        <motion.div
          className="flex gap-6"
          style={{ x }}
          animate={controls}
          onMouseDown={handleDragStart}
          onMouseMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
          onTouchStart={handleDragStart}
          onTouchMove={handleDragMove}
          onTouchEnd={handleDragEnd}
          style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
        >
          {infinitePlayers.map((player, index) => (
            <div key={`${player.id}-${index}`} className="flex-shrink-0">
              <PlayerCard
                src={player.headshot}
                name={player.name}
                position={player.position}
                club={player.club}
                number={player.number}
                className="w-64"
              />
            </div>
          ))}
        </motion.div>
        
        {/* Gradient Overlays */}
        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-zinc-900 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-zinc-900 pointer-events-none" />
      </div>
      
      {/* Dots Indicator (Hidden as requested) */}
      {/* <div className="flex justify-center mt-6 gap-2">
        {players.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-colors ${
              index === currentIndex ? 'bg-zinc-900 dark:bg-zinc-100' : 'bg-zinc-300 dark:bg-zinc-700'
            }`}
          />
        ))}
      </div> */}
    </div>
  );
}


