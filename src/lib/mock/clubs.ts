export type Club = {
  id: string;
  slug: string;
  name: string;
  shortName?: string;
  crest: string;
  primaryColor: string;
  secondaryColor?: string;
  league: string;
  country: string;
  founded?: number;
  stadium?: string;
  description?: string;
  playerCount?: number;
  itemCount?: number;
};

export const clubs: Club[] = [
  {
    id: "pvf-cand",
    slug: "pvf-cand",
    name: "PVF-CAND FC",
    shortName: "PVF-CAND",
    crest: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?w=200&h=200&fit=crop",
    primaryColor: "#DC2626",
    secondaryColor: "#FBBF24",
    league: "V.League 1",
    country: "Vietnam",
    founded: 2012,
    stadium: "PVF Stadium",
    description: "Câu lạc bộ bóng đá trẻ hàng đầu Việt Nam, chuyên đào tạo tài năng trẻ.",
    playerCount: 1,
    itemCount: 5,
  },
  {
    id: "ha-noi-fc",
    slug: "ha-noi-fc",
    name: "Hà Nội FC",
    shortName: "Hà Nội",
    crest: "https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=200&h=200&fit=crop",
    primaryColor: "#7C3AED",
    secondaryColor: "#F59E0B",
    league: "V.League 1",
    country: "Vietnam",
    founded: 2006,
    stadium: "Hàng Đẫy Stadium",
    description: "Đội bóng vô địch V.League nhiều lần, đại diện cho Thủ đô Hà Nội.",
    playerCount: 2,
    itemCount: 12,
  },
  {
    id: "slna",
    slug: "song-lam-nghe-an",
    name: "Sông Lam Nghệ An (SLNA)",
    shortName: "SLNA",
    crest: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=200&h=200&fit=crop",
    primaryColor: "#F97316",
    secondaryColor: "#0EA5E9",
    league: "V.League 1",
    country: "Vietnam",
    founded: 1954,
    stadium: "Vinh Stadium",
    description: "Một trong những CLB lâu đời nhất Việt Nam với truyền thống vẻ vang.",
    playerCount: 3,
    itemCount: 18,
  },
  {
    id: "becamex-tphcm",
    slug: "becamex-tphcm",
    name: "Becamex TP.HCM",
    shortName: "Becamex HCM",
    crest: "https://images.unsplash.com/photo-1614632537423-1e6c2e7e0aae?w=200&h=200&fit=crop",
    primaryColor: "#0EA5E9",
    secondaryColor: "#EF4444",
    league: "V.League 1",
    country: "Vietnam",
    founded: 2001,
    stadium: "Thống Nhất Stadium",
    description: "Cựu vương V.League, đang tái thiết với tham vọng trở lại đỉnh cao.",
    playerCount: 1,
    itemCount: 8,
  },
  {
    id: "shb-da-nang",
    slug: "shb-da-nang",
    name: "SHB Đà Nẵng",
    shortName: "SHB ĐN",
    crest: "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=200&h=200&fit=crop",
    primaryColor: "#EC4899",
    secondaryColor: "#8B5CF6",
    league: "V.League 1",
    country: "Vietnam",
    founded: 1976,
    stadium: "Hòa Xuân Stadium",
    description: "Đội bóng miền Trung với lối chơi tấn công hấp dẫn.",
    playerCount: 2,
    itemCount: 10,
  },
  {
    id: "viettel-fc",
    slug: "the-cong-viettel",
    name: "Thể Công – Viettel FC",
    shortName: "Viettel",
    crest: "https://images.unsplash.com/photo-1542887800-faca0261c9e1?w=200&h=200&fit=crop",
    primaryColor: "#EF4444",
    secondaryColor: "#FBBF24",
    league: "V.League 1",
    country: "Vietnam",
    founded: 1954,
    stadium: "Hàng Đẫy Stadium",
    description: "Nhà vô địch V.League gần đây nhất với lực lượng mạnh.",
    playerCount: 3,
    itemCount: 15,
  },
  {
    id: "hong-linh-ha-tinh",
    slug: "hong-linh-ha-tinh",
    name: "Hồng Lĩnh Hà Tĩnh",
    shortName: "Hà Tĩnh",
    crest: "https://images.unsplash.com/photo-1511824475066-60f2f3cd815f?w=200&h=200&fit=crop",
    primaryColor: "#22C55E",
    secondaryColor: "#FBBF24",
    league: "V.League 1",
    country: "Vietnam",
    founded: 2007,
    stadium: "Hà Tĩnh Stadium",
    description: "Đội bóng của xứ Nghệ với tinh thần chiến đấu cao.",
    playerCount: 1,
    itemCount: 6,
  },
];


