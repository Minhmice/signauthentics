"use client";

import * as React from "react";
import { motion, useMotionValue, useAnimation } from "framer-motion";
import { articles } from "@/lib/mock/articles";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

export default function LatestNews() {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [dragStart, setDragStart] = React.useState(0);
  const [dragOffset, setDragOffset] = React.useState(0);
  
  const controls = useAnimation();
  const x = useMotionValue(0);
  
  // Create infinite scroll data by duplicating articles
  const infiniteArticles = React.useMemo(() => {
    return [...articles, ...articles, ...articles];
  }, []);
  
  const cardWidth = 400; // 370px + 30px gap
  const containerWidth = cardWidth * articles.length;
  
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
    setCurrentIndex((prev) => (prev + 1) % articles.length);
  };
  
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + articles.length) % articles.length);
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
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isDragging]);

  return (
    <div className="relative overflow-hidden mb-14 md:mb-20">
      {/* Header */}
      <div className="container pb-4">
        <div className="flex items-center justify-center mb-9 md:py-2 md:mb-16">
          <h2 className="text-2xl uppercase md:text-3xl lg:text-4xl md:mr-auto font-bold">
            Latest News
          </h2>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevious}
              className="hidden ml-9 md:block h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goToNext}
              className="hidden ml-5 md:block h-10 w-10 rounded-full border-zinc-300 hover:border-zinc-400 dark:border-zinc-700 dark:hover:border-zinc-600"
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
        
        {/* Carousel Container */}
        <div className="relative overflow-hidden">
          <motion.div
            className="flex gap-8"
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
            {infiniteArticles.map((article, index) => (
              <div key={`${article.id}-${index}`} className="flex-shrink-0 w-[370px]">
                <div className="relative group">
                  {/* Date Badge */}
                  <div className="absolute right-2.5 top-2.5 bg-green text-xs uppercase text-center w-18 h-10 px-1 py-3 rounded-md md:right-7 md:-top-6 md:w-16 md:h-16 md:py-2.5 md:px-1 z-10">
                    <p className="inline-block md:block md:leading-none md:text-2xl text-white font-bold">
                      {new Date(article.dateISO).getDate()}
                    </p>
                    <p className="inline-block md:block md:text-sm text-white">
                      {new Date(article.dateISO).toLocaleDateString('en-US', { month: 'short' })}
                    </p>
                  </div>
                  
                  {/* Article Card */}
                  <div className="flex flex-col rounded-lg overflow-hidden bg-zinc-800 h-full group-hover:scale-105 transition-transform duration-300">
                    <a href="#" target="_blank" className="block aspect-square">
                      <Image
                        src={article.image}
                        alt={article.title}
                        width={370}
                        height={370}
                        className="w-full h-full object-cover aspect-square mx-auto"
                      />
                    </a>
                    <div className="flex flex-col items-start grow py-5 px-4 md:py-6 md:px-9">
                      <p className="text-xs mb-6 leading-relaxed h-[78px] md:text-base md:leading-relaxed md:mb-7 text-white line-clamp-3">
                        {article.title}
                      </p>
                      <Button className="min-w-36 h-8 text-xs mt-auto md:text-[15px] md:h-11">
                        Read Article
                      </Button>
                      {/* Social Media Links */}
                      <div className="mt-3 text-xs text-zinc-400 space-y-1">
                        <div>vff.org.vn</div>
                        <div>/VietnameseFootball</div>
                        <div>/VFFChannel</div>
                        <div>@vff.official</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
          
          {/* Gradient Overlays */}
          <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent dark:from-zinc-900 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent dark:from-zinc-900 pointer-events-none" />
        </div>
        
        {/* Mobile View All Button */}
        <div className="container mt-6 text-center md:hidden">
          <Button className="min-w-36 text-xs md:text-base">
            View All
          </Button>
        </div>
      </div>
    </div>
  );
}


