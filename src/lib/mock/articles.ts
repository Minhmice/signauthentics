export type Article = {
  id: string;
  slug: string;
  title: string;
  image: string;
  dateISO: string;
  category: string;
  excerpt: string;
  body: string;
  author?: string;
};

export const articles: Article[] = [
  {
    id: "ar1",
    slug: "do-sy-huy-goalkeeper-spotlight",
    title: "THỦ MÔN ĐỖ SỸ HUY - Tài năng trẻ đầy triển vọng",
    image: "/PlayerImages/chandung22tuyenthu1.jpg",
    dateISO: "2024-10-10T00:00:00.000Z",
    category: "Players",
    excerpt: "Cầu thủ trẻ tài năng với khả năng phản xạ nhanh và chỉ huy hàng phòng ngự xuất sắc.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar2", 
    slug: "quan-van-chuan-experience",
    title: "THỦ MÔN QUAN VĂN CHUẨN - Kinh nghiệm vàng",
    image: "/PlayerImages/chandung22tuyenthu2.jpg",
    dateISO: "2024-10-10T00:00:00.000Z",
    category: "Players",
    excerpt: "Thủ môn kinh nghiệm với khả năng chỉ huy và phản xạ tuyệt vời.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar3",
    slug: "cao-van-binh-rising-star", 
    title: "THỦ MÔN CAO VĂN BÌNH - Ngôi sao đang lên",
    image: "/PlayerImages/chandung22tuyenthu3.jpg",
    dateISO: "2024-10-14T00:00:00.000Z",
    category: "Players",
    excerpt: "Thủ môn trẻ với tiềm năng phát triển lớn và tinh thần thi đấu cao.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar4",
    slug: "vo-minh-trong-defender",
    title: "HẬU VỆ VÕ MINH TRỌNG - Tốc độ và sức mạnh",
    image: "/PlayerImages/chandung22tuyenthu4.jpg", 
    dateISO: "2024-10-10T00:00:00.000Z",
    category: "Players",
    excerpt: "Hậu vệ cánh phải với tốc độ và sức mạnh vượt trội.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar5",
    slug: "le-nguyen-hoang-defender",
    title: "HẬU VỆ LÊ NGUYÊN HOÀNG - Tài năng trẻ",
    image: "/PlayerImages/chandung22tuyenthu5.jpg",
    dateISO: "2024-10-08T00:00:00.000Z",
    category: "Players", 
    excerpt: "Hậu vệ trẻ tài năng của đội tuyển U22 Việt Nam.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar6",
    slug: "nguyen-manh-hung-left-back",
    title: "HẬU VỆ NGUYỄN MẠNH HƯNG - Cánh trái tấn công",
    image: "/PlayerImages/chandung22tuyenthu6.jpg",
    dateISO: "2024-10-05T00:00:00.000Z",
    category: "Players",
    excerpt: "Hậu vệ cánh trái với khả năng tấn công tốt.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar7",
    slug: "nguyen-hong-phuc-center-back",
    title: "TRUNG VỆ NGUYỄN HỒNG PHÚC - Chắc chắn và ổn định",
    image: "/PlayerImages/chandung22tuyenthu7.jpg",
    dateISO: "2024-10-03T00:00:00.000Z",
    category: "Players",
    excerpt: "Trung vệ chắc chắn với khả năng đọc tình huống tốt.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  },
  {
    id: "ar8",
    slug: "dinh-xuan-tien-midfielder",
    title: "TIỀN VỆ ĐINH XUÂN TIẾN - Kỹ thuật cá nhân xuất sắc",
    image: "/PlayerImages/chandung22tuyenthu8.jpg",
    dateISO: "2024-10-01T00:00:00.000Z",
    category: "Players",
    excerpt: "Tiền vệ tấn công với kỹ thuật cá nhân xuất sắc.",
    body: "# Article body\n\nThis is mock content for the hi-fi UI only."
  }
];


