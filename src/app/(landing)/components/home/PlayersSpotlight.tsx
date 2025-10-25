"use client";

import PlayerCard from "@/app/(landing)/components/cards/PlayerCard";
import { players } from "@/lib/mock/players";
import { OptimizedCarousel } from "@/components/shared/OptimizedCarousel";

const CARD_WIDTH = 256;

export default function PlayersSpotlight() {
  return (
    <OptimizedCarousel
      items={players}
      renderItem={(player) => (
        <PlayerCard
          src={player.headshot}
          name={player.name}
          position={player.position}
          club={player.club}
          number={player.number}
          className="w-full"
        />
      )}
      cardWidth={CARD_WIDTH}
      gap={24}
      autoPlay
      autoPlayInterval={5000}
      title="Cầu thủ nổi bật"
      showNavigation
      showNavigationOnMobile
      enableParallax
      enableBlur
      enableGestureVelocity
      enableSmoothSnap
      enableScrollReveal
      scrollRevealOptions={{
        stagger: 0.1,
        duration: 1,
        from: { opacity: 0, y: 80, scale: 0.9 },
        ease: "power3.out"
      }}
    />
  );
}


