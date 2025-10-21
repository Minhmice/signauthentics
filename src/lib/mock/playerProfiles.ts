import vnRaw from "@/lib/mock/vietnam_olympic_players.json" assert { type: "json" };

export type PlayerProfile = {
  id: string;
  slug: string;
  identifiers: {
    full_name?: string;
    known_as?: string;
    name_native?: string;
    jersey_number?: number;
    headshot?: { url?: string; alt?: string };
  };
  club_career?: {
    current_club?: { name?: string; country?: string; league?: string };
  };
  national_team?: { teams?: Array<{ level?: string; caps?: number; goals?: number }> };
  // Original JSON fields
  date_of_birth?: string;
  place_of_birth?: string;
  nationality?: string;
  height_m?: number;
  weight_kg?: number;
  positions?: string[];
  preferred_foot?: string;
  contract?: {
    status?: string;
    joined?: string;
    on_loan_from?: string;
  };
  youth_clubs?: string[];
  tournament_numbers?: Array<{
    tournament?: string;
    number?: number;
  }>;
  sources?: string[];
  image_local?: string;
};

type VnPlayer = {
  id: string;
  full_name?: string;
  common_name?: string;
  date_of_birth?: string;
  place_of_birth?: string;
  nationality?: string;
  height_m?: number;
  weight_kg?: number;
  positions?: string[];
  preferred_foot?: string;
  club_number?: number;
  current_club?: { name?: string; country?: string; league?: string };
  contract?: {
    status?: string;
    joined?: string;
    on_loan_from?: string;
  };
  youth_clubs?: string[];
  tournament_numbers?: Array<{
    tournament?: string;
    number?: number;
  }>;
  sources?: string[];
  image_local?: string;
};

type VnDataset = { players: Array<VnPlayer> };
const dataset = (vnRaw as unknown as VnDataset).players || [];

export const playerProfiles: PlayerProfile[] = dataset.map((p) => {
  const imageLocal: string | undefined = p.image_local;
  const fileName = typeof imageLocal === "string" ? imageLocal.split("/").pop() : undefined;
  const localUrl = fileName ? `/PlayerImages/${fileName}` : undefined;
  return {
    ...p, // Keep all original fields
    id: String(p.id),
    slug: String(p.id),
    identifiers: {
      full_name: p.full_name,
      known_as: p.common_name || p.full_name,
      jersey_number: p.club_number,
      headshot: { url: localUrl, alt: p.common_name || p.full_name },
    },
    club_career: {
      current_club: {
        name: p.current_club?.name,
        country: p.current_club?.country,
        league: p.current_club?.league,
      },
    },
  } as PlayerProfile;
});

export const playerBySlug = new Map(playerProfiles.map((p) => [p.slug, p]));

export function getDisplayName(p: PlayerProfile) {
  return p.identifiers?.known_as || p.identifiers?.full_name || p.slug;
}

export function getHeadshot(p: PlayerProfile) {
  const candidate = p.identifiers?.headshot?.url;
  const isValidRemote = typeof candidate === "string" && /^https?:\/\//.test(candidate) && !candidate.includes("...");
  return isValidRemote
    ? candidate!
    : candidate || "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=800&auto=format&fit=crop";
}

export function getClubName(p: PlayerProfile) {
  return p.club_career?.current_club?.name || "Unknown Club";
}


