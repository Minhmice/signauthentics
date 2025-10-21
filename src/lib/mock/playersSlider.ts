export const playersSliderData = [
  {
    id: "messi",
    name: "MESSI",
    image: "/PlayerImages/chandung22tuyenthu1.jpg",
    background: "linear-gradient(#a3cced, #638cad)",
    product: {
      title: "Lionel Messi Back Signed Argentina 2022 Home Shirt In Classic Frame",
      price: "£1,500.00",
      image: "/PlayerImages/chandung22tuyenthu2.jpg",
      badge: "MESSI"
    },
    ctaText: "Shop Messi",
    ctaLink: "/players/messi"
  },
  {
    id: "yamal",
    name: "YAMAL",
    image: "/PlayerImages/chandung22tuyenthu3.jpg",
    background: "linear-gradient(#ff3600, #bf0000)",
    product: {
      title: "Lamine Yamal Back Signed Spain 2024-25 Home Shirt In Hero Frame",
      price: "£774.99",
      image: "/PlayerImages/chandung22tuyenthu4.jpg"
    },
    ctaText: "Shop Yamal",
    ctaLink: "/players/yamal"
  },
  {
    id: "palmer",
    name: "PALMER",
    image: "/PlayerImages/chandung22tuyenthu5.jpg",
    background: "linear-gradient(#00148b, #00004b)",
    product: {
      title: "Cole Palmer Back Signed Chelsea 2024-25 Home Shirt In Hero Frame",
      price: "£499.99",
      image: "/PlayerImages/chandung22tuyenthu6.jpg"
    },
    ctaText: "Shop Palmer",
    ctaLink: "/players/palmer"
  },
  {
    id: "maradona",
    name: "DIEGO",
    image: "/PlayerImages/chandung22tuyenthu7.jpg",
    background: "linear-gradient(#97c5ea, #5785aa)",
    product: {
      title: "Diego Maradona Official 1986 FIFA World Cup™ Back Signed and Framed Argentina 1986 Home Shirt",
      price: "£8,000.00",
      image: "/PlayerImages/chandung22tuyenthu8.jpg",
      badge: "FIFA WORLD CUP"
    },
    ctaText: "Shop Maradona",
    ctaLink: "/players/maradona"
  },
  {
    id: "pele",
    name: "PELÉ",
    image: "/PlayerImages/chandung22tuyenthu9.jpg",
    background: "linear-gradient(#f9c802, #b98800)",
    product: {
      title: "Pele Back Signed Brazil Retro Home Shirt In Hero Frame",
      price: "£999.99",
      image: "/PlayerImages/chandung22tuyenthu10.jpg"
    },
    ctaText: "Shop Pelé",
    ctaLink: "/players/pele"
  },
  {
    id: "zidane",
    name: "ZIDANE",
    image: "/PlayerImages/chandung22tuyenthu11.jpg",
    background: "linear-gradient(#f0f0f0, #b0b0b0)",
    product: {
      title: "PRE-FRAMED Zinedine Zidane Official UEFA Champions League Signed and Framed Real Madrid Photo",
      price: "£679.99",
      image: "/PlayerImages/chandung22tuyenthu12.jpg",
      badge: "UCL"
    },
    ctaText: "Shop Zidane",
    ctaLink: "/players/zidane"
  },
  {
    id: "jordan",
    name: "JORDAN",
    image: "/PlayerImages/chandung22tuyenthu13.jpg",
    background: "linear-gradient(#ad2930, #6d0000)",
    product: {
      title: "Michael Jordan Signed and Framed Chicago Bulls 1997-98 Away Jersey",
      price: "£14,999.99",
      image: "/PlayerImages/chandung22tuyenthu14.jpg"
    },
    ctaText: "Shop Jordan",
    ctaLink: "/players/jordan"
  },
  {
    id: "martinez",
    name: "EMI",
    image: "/PlayerImages/chandung22tuyenthu15.jpg",
    background: "linear-gradient(#cce8cc, #8ca88c)",
    product: {
      title: "Emiliano Martinez Official 2022 FIFA World Cup™ Back Signed and Hero Framed Argentina 2022 Home Goalkeeper Shirt",
      price: "£1,100.00",
      image: "/PlayerImages/chandung22tuyenthu16.jpg",
      badge: "FIFA WORLD CUP"
    },
    ctaText: "Shop Martínez",
    ctaLink: "/players/martinez"
  },
  {
    id: "mbappe",
    name: "MBAPPÉ",
    image: "/PlayerImages/chandung22tuyenthu17.jpg",
    background: "linear-gradient(#2b3359, #000019)",
    product: {
      title: "Lionel Messi & Kylian Mbappe Official Paris Saint-Germain Front Signed and Framed 2022-23 Away Shirt",
      price: "£5,599.99",
      image: "/PlayerImages/chandung22tuyenthu18.jpg",
      badge: "PSG"
    },
    ctaText: "Shop Mbappé",
    ctaLink: "/players/mbappe"
  },
  {
    id: "modric",
    name: "MODRIĆ",
    image: "/PlayerImages/chandung22tuyenthu19.jpg",
    background: "linear-gradient(#dde2df, #9da29f)",
    product: {
      title: "Luka Modric Official Ballon d'Or™ Signed and Framed Croatia Photo: Goal vs Argentina",
      price: "£240.00",
      image: "/PlayerImages/chandung22tuyenthu20.jpg",
      badge: "BALLON D'OR"
    },
    ctaText: "Shop Modrić",
    ctaLink: "/players/modric"
  }
];

export type PlayerSlide = {
  id: string;
  name: string;
  image: string;
  background: string;
  product: {
    title: string;
    price: string;
    image: string;
    badge?: string;
  };
  ctaText: string;
  ctaLink: string;
};
