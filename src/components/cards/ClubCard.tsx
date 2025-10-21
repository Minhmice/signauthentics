import Image from "next/image";
import Link from "next/link";
import type { Club } from "@/lib/mock/clubs";

type Props = {
  club: Club;
};

export default function ClubCard({ club }: Props) {
  return (
    <Link
      href={`/clubs/${club.slug}`}
      className="group block"
      style={
        {
          "--club-primary": club.primaryColor,
          "--club-secondary": club.secondaryColor || club.primaryColor,
        } as React.CSSProperties
      }
    >
      <div className="relative rounded-2xl border border-border overflow-hidden hover:shadow-lg transition-all duration-300 group-hover:scale-[1.02] bg-card">
        {/* Crest */}
        <div className="relative aspect-square bg-gradient-to-br from-muted to-muted/50 p-6 flex items-center justify-center">
          <div className="absolute inset-0 opacity-10" style={{ background: `linear-gradient(135deg, var(--club-primary), var(--club-secondary))` }} />
          <Image src={club.crest} alt={club.name} width={120} height={120} className="relative z-10 object-contain drop-shadow-lg" />
        </div>

        {/* Info */}
        <div className="p-4 bg-card">
          <h3 className="font-bold text-lg tracking-tight mb-1 line-clamp-1">{club.shortName || club.name}</h3>
          <p className="text-sm text-muted-foreground mb-3">{club.league}</p>

          {/* Stats */}
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            {club.playerCount !== undefined && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">{club.playerCount}</span>
                <span>cầu thủ</span>
              </div>
            )}
            {club.itemCount !== undefined && (
              <div className="flex items-center gap-1">
                <span className="font-semibold">{club.itemCount}</span>
                <span>món đồ</span>
              </div>
            )}
          </div>
        </div>

        {/* Accent bar */}
        <div className="h-1 w-full" style={{ background: `linear-gradient(90deg, var(--club-primary), var(--club-secondary))` }} />
      </div>
    </Link>
  );
}

