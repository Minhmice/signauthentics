import Section from "@/components/ui/Section";
import CollectionCard from "@/components/cards/CollectionCard";
import { collections } from "@/lib/mock/collections";
import HeroMasthead from "./components/home/HeroMasthead";
import PlayersSlider from "./components/home/PlayersSlider";
import PromoSaleWithFeature from "./components/home/PromoSaleWithFeature";
import PlayersSpotlight from "./components/home/PlayersSpotlight";
import BallonDorCarousel from "./components/home/BallonDorCarousel";
import LatestNews from "./components/home/LatestNews";

export default function Home() {
  return (
    <div className="space-y-8">
      <Section>
        <HeroMasthead />
      </Section>

      <PlayersSlider />

      <Section>
        <PromoSaleWithFeature />
      </Section>

      <Section>
        <PlayersSpotlight />
      </Section>

      <Section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {collections.slice(0, 4).map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      </Section>

      <Section>
        <BallonDorCarousel />
      </Section>

      <Section>
        <LatestNews />
      </Section>
    </div>
  );
}
