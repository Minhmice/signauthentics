"use client";

import { articles } from "@/lib/mock/articles";
import { Button } from "@/components/ui/button";
import { OptimizedCarousel } from "@/components/shared/OptimizedCarousel";
import Image from "next/image";
import { motion } from "framer-motion";

const CARD_WIDTH = 370;

// Render article card with custom layout
function ArticleCardContent({ article }: { article: typeof articles[0] }) {
  return (
    <div className="relative group hover:z-10">
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
      <motion.div 
        className="flex flex-col rounded-lg overflow-hidden bg-zinc-800 h-full transition-shadow duration-300"
        whileHover={{ 
          scale: 1.02,
          boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
          transition: { type: "spring", stiffness: 400, damping: 17 }
        }}
      >
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
      </motion.div>
    </div>
  );
}

export default function LatestNews() {
  return (
    <div className="relative overflow-hidden mb-14 md:mb-20">
      <div className="container pb-4">
        <OptimizedCarousel
          items={articles}
          renderItem={(article) => <ArticleCardContent article={article} />}
          cardWidth={CARD_WIDTH}
          gap={32}
          autoPlay
          autoPlayInterval={6000}
          title="LATEST NEWS"
          showNavigation
          className="py-4 px-2"
          fadeWidth="w-12"
          enableParallax
          enableBlur
          enableGestureVelocity
          enableSmoothSnap
          enableScrollReveal
          scrollRevealOptions={{
            stagger: 0.15,
            duration: 1.4,
            from: { opacity: 0, y: 120, scale: 0.8 },
            ease: "power4.out"
          }}
        />
        
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


