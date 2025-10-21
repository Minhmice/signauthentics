export type Collection = {
  id: string;
  slug: string;
  name: string;
  heroImage: string;
  description: string;
  accentHex: string;
};

export const collections: Collection[] = [
  { id: "col1", slug: "messi", name: "Official MESSI", heroImage: "/PlayerImages/chandung22tuyenthu11.jpg", description: "Signature collection.", accentHex: "#1E90FF" },
  { id: "col2", slug: "the-best", name: "The Best", heroImage: "/PlayerImages/chandung22tuyenthu12.jpg", description: "Award collection.", accentHex: "#0EA5E9" },
  { id: "col3", slug: "ballon-dor", name: "Ballon d'Or", heroImage: "/PlayerImages/chandung22tuyenthu13.jpg", description: "Winners collection.", accentHex: "#F59E0B" },
  { id: "col4", slug: "editorial", name: "Editorial", heroImage: "/PlayerImages/chandung22tuyenthu14.jpg", description: "Special editorial.", accentHex: "#22C55E" },
  { id: "col5", slug: "legends", name: "Legends", heroImage: "/PlayerImages/chandung22tuyenthu15.jpg", description: "All-time greats.", accentHex: "#E11D48" },
  { id: "col6", slug: "rookies", name: "Rookies", heroImage: "/PlayerImages/chandung22tuyenthu16.jpg", description: "Rising stars.", accentHex: "#A855F7" },
];


