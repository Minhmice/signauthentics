/**
 * BallonDorCarousel - Product carousel with all modern animations
 * Powered by OptimizedCarousel for consistency and performance
 */

"use client";

import ProductCard from "@/app/(landing)/components/cards/ProductCard";
import { products } from "@/lib/mock/products";
import { OptimizedCarousel } from "@/components/shared/OptimizedCarousel";

const CARD_WIDTH = 256;

export default function BallonDorCarousel() {
  const ballonDorProducts = products.slice(0, 10);

  return (
    <OptimizedCarousel
      items={ballonDorProducts}
      renderItem={(product) => (
        <ProductCard 
          id={product.id} 
          title={product.title} 
          priceVND={product.priceVND} 
          images={product.images} 
          rarity={product.rarity} 
          accentHex={product.accentHex} 
        />
      )}
      cardWidth={CARD_WIDTH}
      gap={24}
      autoPlay
      autoPlayInterval={5000}
      title="Ballon d'Or Winners"
      showNavigation
      showNavigationOnMobile
      enableParallax
      enableBlur
      enableGestureVelocity
      enableSmoothSnap
      enableScrollReveal
      scrollRevealOptions={{
        stagger: 0.12,
        duration: 1.2,
        from: { opacity: 0, y: 100, scale: 0.85 },
        ease: "power4.out"
      }}
    />
  );
}

