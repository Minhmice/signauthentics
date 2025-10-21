"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { DotsIndicator } from "@/components/shared/DotsIndicator";
import { playersSliderData, type PlayerSlide } from "@/lib/mock/playersSlider";
import { useAutoPlay } from "@/hooks/useAutoPlay";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function PlayersSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const slides: PlayerSlide[] = playersSliderData;

  const nextSlide = () => setActiveSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setActiveSlide((prev) => (prev - 1 + slides.length) % slides.length);

  const { pause, resume } = useAutoPlay({
    onNext: nextSlide,
    interval: 5000,
    enabled: true
  });

  if (!slides || slides.length === 0) {
    return <div className="p-8 text-center">Loading players...</div>;
  }

  const currentSlide = slides[activeSlide];
  
  if (!currentSlide) {
    return <div className="p-8 text-center">No slide data available</div>;
  }

  console.log('PlayersSlider Debug:', {
    activeSlide,
    slidesLength: slides.length,
    currentSlide: currentSlide?.name,
    currentSlideData: currentSlide
  });

  return (
    <section className="overflow-hidden md:pt-20 mb-11 md:mb-24">
      {/* Header */}
      <div className="pt-12 pb-4 md:pb-8">
        <div className="container flex items-center justify-center md:justify-end gap-9">
          <span className="text-2xl uppercase md:text-3xl lg:text-4xl font-bold">Players</span>
          <div className="hidden md:flex items-center gap-5">
            <button 
              onClick={prevSlide} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button 
              onClick={nextSlide} 
              className="p-2 hover:bg-white/20 rounded-full transition-colors flex items-center justify-center"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {/* Slider - Simple version without Framer Motion */}
      <div 
        className="container md:px-0 md:max-w-none relative"
        onMouseEnter={pause}
        onMouseLeave={resume}
      >
        <div className="relative">
          {/* Background */}
          <div 
            className="rounded-lg absolute inset-0 md:rounded-none transition-all duration-700"
            style={{ 
              background: currentSlide?.background || 'linear-gradient(#ff0000, #00ff00)',
              minHeight: '400px'
            }}
          />
          
          <div className="container px-0 md:px-6">
            <div className="relative h-[550px] md:h-[520px]">
              {/* Product Card */}
              <div className="hidden absolute z-30 right-5 bottom-5 flex-col rounded-xl bg-white w-52 max-w-[370px] h-[340px] md:flex md:w-64 md:h-[450px] md:left-0 md:bottom-9 lg:w-1/2 lg:h-[110%]">
                <div className="flex items-center justify-center px-5 py-8 grow h-1/2 md:px-9 md:py-11">
                  <Image 
                    src={currentSlide?.product?.image || ''} 
                    alt={currentSlide?.product?.title || ''} 
                    width={200} 
                    height={200} 
                    className="w-full object-contain" 
                  />
                </div>
                <div className="p-3 pb-4 text-black text-center border-t border-grey-light md:p-8 md:pb-6">
                  <div className="text-xs leading-relaxed max-h-[57px] overflow-hidden md:text-sm md:max-h-full">
                    {currentSlide?.product?.title}
                  </div>
                  <div className="flex justify-center items-center mt-3 lg:mt-8">
                    {currentSlide?.product?.badge && (
                      <div className="mr-2 h-[50px] flex items-center">
                        <span className="text-xs font-bold bg-gray-200 px-2 py-1 rounded">
                          {currentSlide.product.badge}
                        </span>
                      </div>
                    )}
                    <div className="py-3.5 px-3 text-sm border border-grey-light rounded-md md:text-[15px] md:py-3.5 md:px-4">
                      <span className="price font-bold text-lg">{currentSlide?.product?.price}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Player Image */}
              <div className="relative -left-3 z-20 h-full w-[calc(100%+24px)] flex items-end justify-center md:right-10 md:w-auto">
                {currentSlide?.image ? (
                  <Image 
                    src={currentSlide.image} 
                    alt={currentSlide.name || 'Player'} 
                    width={400} 
                    height={600} 
                    className="h-[390px] md:h-[595px] object-cover object-right lg:h-[690px]"
                  />
                ) : (
                  <div className="h-[390px] md:h-[595px] lg:h-[690px] w-[300px] bg-gray-300 flex items-center justify-center">
                    <span className="text-gray-600">No Image</span>
                  </div>
                )}
              </div>

              {/* Player Name & CTA */}
              <div className="absolute top-12 right-0 w-full uppercase text-center md:text-right md:top-1/4 md:w-auto">
                <h3 className="z-10 uppercase text-5xl md:text-6xl lg:text-[90px] text-white font-bold">
                  {currentSlide?.name || 'PLAYER'}
                </h3>
                <Button className="z-30 text-xs mt-6 px-3 md:text-base md:mt-12 md:px-7 bg-black hover:bg-gray-800 text-white">
                  {currentSlide?.ctaText || 'Shop Now'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Dots Indicators */}
      <DotsIndicator
        total={slides.length}
        current={activeSlide}
        onSelect={setActiveSlide}
        className="mt-2 md:hidden"
        size="md"
      />

      {/* Desktop Dots Indicators */}
      <DotsIndicator
        total={slides.length}
        current={activeSlide}
        onSelect={setActiveSlide}
        className="mt-10"
        size="lg"
        showOnMobile={false}
      />
    </section>
  );
}