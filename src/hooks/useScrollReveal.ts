/**
 * useScrollReveal - GSAP ScrollTrigger hook for scroll-based animations
 * Reveals cards when scrolling into viewport
 */

"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Register ScrollTrigger plugin
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

type ScrollRevealOptions = {
  enabled?: boolean;
  stagger?: number;
  duration?: number;
  delay?: number;
  from?: {
    opacity?: number;
    y?: number;
    x?: number;
    scale?: number;
    rotateX?: number;
    rotateY?: number;
  };
  ease?: string;
  markers?: boolean; // For debugging
  start?: string;
  end?: string;
  once?: boolean;
};

const defaultOptions: ScrollRevealOptions = {
  enabled: true,
  stagger: 0.08,
  duration: 0.8,
  delay: 0,
  from: {
    opacity: 0,
    y: 60,
    scale: 0.95,
  },
  ease: "power3.out",
  markers: false,
  start: "top 80%",
  end: "top 20%",
  once: true,
};

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLElement | null)[]>([]);
  
  const config = { ...defaultOptions, ...options };

  useEffect(() => {
    if (!config.enabled || typeof window === "undefined") return;
    
    const container = containerRef.current;
    if (!container) return;

    // Get all cards
    const cards = cardsRef.current.filter(Boolean);
    if (cards.length === 0) return;

    // Create GSAP timeline with ScrollTrigger
    const ctx = gsap.context(() => {
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          start: config.start,
          end: config.end,
          toggleActions: config.once ? "play none none none" : "play none none reverse",
          markers: config.markers,
          // scrub: 0.5, // Uncomment for scrub effect
        },
      });

      // Animate cards with stagger
      timeline.fromTo(
        cards,
        {
          opacity: config.from?.opacity ?? 0,
          y: config.from?.y ?? 60,
          x: config.from?.x ?? 0,
          scale: config.from?.scale ?? 0.95,
          rotateX: config.from?.rotateX ?? 0,
          rotateY: config.from?.rotateY ?? 0,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          scale: 1,
          rotateX: 0,
          rotateY: 0,
          duration: config.duration,
          delay: config.delay,
          stagger: config.stagger,
          ease: config.ease,
        }
      );
    }, container);

    // Cleanup
    return () => {
      ctx.revert();
      ScrollTrigger.getAll().forEach(trigger => {
        if (trigger.trigger === container) {
          trigger.kill();
        }
      });
    };
  }, [config.enabled, config.stagger, config.duration, config.delay, config.ease, config.start, config.end, config.once, config.markers]);

  // Function to register card refs
  const registerCard = (index: number) => (el: HTMLElement | null) => {
    cardsRef.current[index] = el;
  };

  return {
    containerRef,
    registerCard,
  };
}

