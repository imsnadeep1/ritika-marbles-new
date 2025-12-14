// Mock data for Ritika Marbles

export const siteConfig = {
  name: "Ritika Marbles",
  tagline: "& Handicrafts",
  phone: "+91-9876543210",
  whatsapp: "+919876543210",
  email: "contact@ritikamarbles.com",
  address: "123 Marble Lane, Jaipur, Rajasthan, India - 302001",
  socialLinks: {
    facebook: "https://facebook.com/ritikamarbles",
    instagram: "https://instagram.com/ritikamarbles",
    youtube: "https://youtube.com/ritikamarbles"
  }
};

export const navItems = [
  { label: "HOME", href: "/" },
  {
    label: "COLLECTIONS",
    href: "/collections",
    dropdown: [
      { label: "Marble Handicrafts", href: "/collections/handicrafts" },
      { label: "Wall Panels", href: "/collections/wall-panels" },
      { label: "Home Decor", href: "/collections/home-decor" }
    ]
  },
  {
    label: "GOD STATUE",
    href: "/god-statue",
    dropdown: [
      { label: "Ganesh Statue", href: "/god-statue/ganesh" },
      { label: "Krishna Statue", href: "/god-statue/krishna" },
      { label: "Shiv Statue", href: "/god-statue/shiv" },
      { label: "Hanuman Statue", href: "/god-statue/hanuman" }
    ]
  },
  { label: "OUR STORY", href: "/about" },
  { label: "CLIENT DIARIES", href: "/testimonials" },
  { label: "BLOG", href: "/blog" },
  { label: "REACH US", href: "/contact" }
];

export const categories = [
  {
    id: "1",
    name: "Lakshmi Ganesh & Saraswati Ji Statue",
    slug: "lakshmi-ganesh-saraswati",
    image: "https://img.freepik.com/free-photo/beautiful-hindu-god-ganesh-illustration_23-2151065221.jpg?w=400",
    description: "Beautiful marble statues of Lakshmi, Ganesh and Saraswati Ji"
  },
  {
    id: "2",
    name: "Radha Krishna Marble Statue",
    slug: "radha-krishna",
    image: "https://img.freepik.com/free-photo/radha-krishna-statue-temple_1268-30963.jpg?w=400",
    description: "Divine Radha Krishna marble statues"
  },
  {
    id: "3",
    name: "Ram Darbar Marble Statue",
    slug: "ram-darbar",
    image: "https://img.freepik.com/free-photo/lord-rama-religious-indian-god_23-2151065315.jpg?w=400",
    description: "Exquisite Ram Darbar marble statues"
  },
  {
    id: "4",
    name: "Shiv Parvati Marble Statue",
    slug: "shiv-parvati",
    image: "https://img.freepik.com/free-photo/lord-shiva-statue_23-2151065302.jpg?w=400",
    description: "Majestic Shiv Parvati marble statues"
  },
  {
    id: "5",
    name: "Ganesh Marble Statue",
    slug: "ganesh",
    image: "https://img.freepik.com/free-photo/ganesh-statue_1203-3795.jpg?w=400",
    description: "Lord Ganesh marble statues in various poses"
  },
  {
    id: "6",
    name: "Hanuman Marble Statue",
    slug: "hanuman",
    image: "https://img.freepik.com/free-photo/statue-hindu-monkey-god-hanuman_23-2151065326.jpg?w=400",
    description: "Powerful Hanuman marble statues"
  },
  {
    id: "7",
    name: "Marble Handicrafts",
    slug: "handicrafts",
    image: "https://img.freepik.com/free-photo/beautiful-decorative-colorful-marble-vase_181624-51426.jpg?w=400",
    description: "Beautiful marble handicrafts for home decor"
  },
  {
    id: "8",
    name: "Wall Panels",
    slug: "wall-panels",
    image: "https://img.freepik.com/free-photo/white-marble-texture-background_53876-63441.jpg?w=400",
    description: "Elegant marble wall panels"
  }
];

export const products = [
  {
    id: "1",
    name: "White Marble Ganesh Statue - 24 inch",
    slug: "white-marble-ganesh-24",
    categoryId: "5",
    price: 45000,
    images: [
      "https://images.unsplash.com/photo-1567591414240-e9c1e6e2d8a3?w=600&h=600&fit=crop"
    ],
    description: "Beautifully crafted white marble Ganesh statue, perfect for home temples.",
    features: ["Pure Makrana Marble", "Hand Carved", "24 inches height", "Customizable"],
    inStock: true
  },
  {
    id: "2",
    name: "Radha Krishna Marble Idol - 18 inch",
    slug: "radha-krishna-18",
    categoryId: "2",
    price: 35000,
    images: [
      "https://images.unsplash.com/photo-1609167830220-7164aa360951?w=600&h=600&fit=crop"
    ],
    description: "Divine Radha Krishna marble idol with intricate detailing.",
    features: ["Premium Quality", "Detailed Carving", "18 inches height", "Gold Paint Accents"],
    inStock: true
  },
  {
    id: "3",
    name: "Ram Darbar Complete Set - 30 inch",
    slug: "ram-darbar-30",
    categoryId: "3",
    price: 125000,
    images: [
      "https://images.unsplash.com/photo-1604608672516-f1b9a5d79c86?w=600&h=600&fit=crop"
    ],
    description: "Complete Ram Darbar set with Lord Ram, Sita, Lakshman, and Hanuman.",
    features: ["Complete Set", "Temple Grade", "30 inches height", "Premium Finish"],
    inStock: true
  },
  {
    id: "4",
    name: "Shiv Parvati Marble Murti - 21 inch",
    slug: "shiv-parvati-21",
    categoryId: "4",
    price: 55000,
    images: [
      "https://images.unsplash.com/photo-1618330834871-a40317591c50?w=600&h=600&fit=crop"
    ],
    description: "Elegant Shiv Parvati marble murti with fine craftsmanship.",
    features: ["Makrana Marble", "Artistic Design", "21 inches height", "Temple Ready"],
    inStock: true
  },
  {
    id: "5",
    name: "Hanuman Ji Marble Statue - 36 inch",
    slug: "hanuman-36",
    categoryId: "6",
    price: 85000,
    images: [
      "https://images.unsplash.com/photo-1604608672516-f1b9a5d79c86?w=600&h=600&fit=crop"
    ],
    description: "Powerful Hanuman Ji marble statue in blessing pose.",
    features: ["Large Size", "Detailed Work", "36 inches height", "Temple Grade"],
    inStock: true
  },
  {
    id: "6",
    name: "Lakshmi Ganesh Set - 15 inch",
    slug: "lakshmi-ganesh-15",
    categoryId: "1",
    price: 28000,
    images: [
      "https://images.unsplash.com/photo-1567591414240-e9c1e6e2d8a3?w=600&h=600&fit=crop"
    ],
    description: "Lakshmi Ganesh marble set perfect for Diwali and home worship.",
    features: ["Pair Set", "Compact Size", "15 inches height", "Gift Ready"],
    inStock: true
  }
];

export const clients = [
  {
    id: "1",
    name: "Royal Architects, Delhi",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  },
  {
    id: "2",
    name: "Heritage Hotels, Jaipur",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  },
  {
    id: "3",
    name: "Temple Trust, Gujarat",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  },
  {
    id: "4",
    name: "Divine Interiors, Mumbai",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  },
  {
    id: "5",
    name: "Marble Palace, Bangalore",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  },
  {
    id: "6",
    name: "Sacred Spaces, Kolkata",
    logo: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=150&h=80&fit=crop"
  }
];

export const galleryImages = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1567591414240-e9c1e6e2d8a3?w=400&h=300&fit=crop",
    title: "Award Ceremony 2023"
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1609167830220-7164aa360951?w=400&h=300&fit=crop",
    title: "Best Craftsman Award"
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1604608672516-f1b9a5d79c86?w=400&h=300&fit=crop",
    title: "Export Excellence"
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1618330834871-a40317591c50?w=400&h=300&fit=crop",
    title: "Quality Achievement"
  },
  {
    id: "5",
    image: "https://images.unsplash.com/photo-1582738411706-bfc8e691d1c2?w=400&h=300&fit=crop",
    title: "Industry Recognition"
  },
  {
    id: "6",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    title: "National Award 2022"
  }
];

export const stats = [
  { label: "GLORIOUS YEARS", value: 25 },
  { label: "INDIAN ARTEFACTS", value: 5000 },
  { label: "PASSIONATE ARTISANS", value: 100 }
];

export const whyChooseUs = [
  {
    id: "1",
    title: "High Quality",
    icon: "award",
    description: "Premium Makrana marble and finest materials"
  },
  {
    id: "2",
    title: "Customizable",
    icon: "settings",
    description: "Bespoke statues tailored to your needs"
  },
  {
    id: "3",
    title: "Quick Support",
    icon: "headphones",
    description: "24/7 customer support for all queries"
  },
  {
    id: "4",
    title: "Fast Delivery",
    icon: "truck",
    description: "Timely delivery across India and worldwide"
  },
  {
    id: "5",
    title: "Huge Collection",
    icon: "grid",
    description: "Wide variety of designs and sizes"
  }
];

export const testimonials = [
  {
    id: "1",
    name: "Rajesh Kumar",
    location: "Delhi",
    text: "Exceptional quality and craftsmanship. The Ganesh statue we ordered exceeded our expectations.",
    rating: 5
  },
  {
    id: "2",
    name: "Priya Sharma",
    location: "Mumbai",
    text: "Beautiful work on our custom Ram Darbar. Truly divine pieces for our home temple.",
    rating: 5
  },
  {
    id: "3",
    name: "Temple Committee",
    location: "Gujarat",
    text: "We ordered multiple large statues for our temple. Outstanding quality and service.",
    rating: 5
  }
];
