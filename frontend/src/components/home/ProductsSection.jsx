import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, ChevronLeft, ChevronRight, Gem, Landmark, PackageCheck, ShoppingBag, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories as fallbackCategories } from "@/data/mock";
import { getCategories } from "@/services/categories";
import ComingSoon from "@/components/ComingSoon";
import { getVisibleCategories } from "@/lib/categories";

const premiumFallbackCollections = [
  { name: "God Statues", slug: "ganesh", image_url: "/images/products/ganesh-new-top.png", description: "Sacred marble idols with hand-finished ornamentation.", icon: Sparkles },
  { name: "Marble Temples", slug: "temples", image_url: "/images/products/mander-marble1.png", description: "Architectural mandirs for serene devotional spaces.", icon: Landmark },
  { name: "Home Decor", slug: "marble-handicrafts-home-decor", image_url: "/images/products/decor.png", description: "Elegant décor and pooja accents for refined interiors.", icon: Gem },
  { name: "Custom Sculptures", slug: "custom-marble-projects", image_url: "/images/products/gallery3.png", description: "Commissioned marble pieces shaped around your vision.", icon: PackageCheck },
  { name: "Garden Statues", slug: "tulsi-stands-planters", image_url: "/images/products/decor2.png", description: "Statement outdoor marble pieces with timeless presence.", icon: Sparkles },
  { name: "Corporate Gifts", slug: "marble-handicrafts-home-decor", image_url: "/images/products/laddu-gopal-3.png", description: "Premium handcrafted gifting for ceremonies and milestones.", icon: Gem },
];

const normalizeCollections = (items = []) => items.map((category, index) => ({
  id: category.id || `${category.slug}-${index}`,
  name: category.name,
  slug: category.slug,
  image_url: category.image_url || category.image || premiumFallbackCollections[index % premiumFallbackCollections.length]?.image_url,
  description: category.description || premiumFallbackCollections[index % premiumFallbackCollections.length]?.description,
  icon: premiumFallbackCollections[index % premiumFallbackCollections.length]?.icon || Gem,
}));

const ProductsSection = () => {
  const scrollRef = useRef(null);

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        const visibleCategories = getVisibleCategories(data, { placement: "show_on_homepage" });
        const source = visibleCategories.length ? visibleCategories : fallbackCategories.slice(4, 10);
        setCategories(normalizeCollections(source).slice(0, 8));
      } catch (err) {
        console.error("Failed to load categories:", err);
        setCategories(normalizeCollections(premiumFallbackCollections));
      } finally {
        setLoading(false);
      }
    }
    loadCategories();
  }, []);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 340;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="collections" className="relative scroll-mt-32 overflow-hidden bg-[#f7f4ee] pb-20 pt-16 sm:pb-28 sm:pt-24">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(212,175,55,0.22),transparent_18%),radial-gradient(circle_at_88%_26%,rgba(0,0,0,0.08),transparent_18%)]" />
      <div className="absolute inset-0 opacity-[0.28] [background-image:linear-gradient(120deg,rgba(255,255,255,0.65)_0%,transparent_36%,rgba(212,175,55,0.12)_100%)]" />

      <div className="relative mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-10 max-w-3xl text-center sm:mb-14">
          <p className="text-sm font-bold uppercase tracking-[0.24em] text-[#B8872F]">
            Explore Our Collection
          </p>
          <div className="mx-auto my-4 flex max-w-sm items-center gap-4">
            <span className="h-px flex-1 bg-[#D4AF37]/45" />
            <Sparkles className="h-5 w-5 text-[#D4AF37]" />
            <span className="h-px flex-1 bg-[#D4AF37]/45" />
          </div>
          <h2 className="font-['Playfair_Display',Georgia,serif] text-4xl font-semibold tracking-[-0.04em] text-[#111] sm:text-5xl lg:text-6xl">
            Marble Creations For Every Space
          </h2>
          <p className="mx-auto mt-5 max-w-2xl font-['Inter',sans-serif] text-base leading-8 text-[#4b453b] sm:text-lg">
            Curated idols, temples, décor, sculpture, and gifting collections crafted with the precision of fine jewelry and the soul of Rajasthan marble art.
          </p>
        </div>

        <div className="mb-8 flex items-center justify-between gap-4">
          <Link to="/god-statue">
            <Button className="rounded-full bg-[#090909] px-6 py-5 text-xs font-black uppercase tracking-[0.14em] text-[#F5CD73] hover:bg-[#1a1710] hover:shadow-[0_0_28px_rgba(212,175,55,0.24)]">
              <ShoppingBag className="mr-2 h-4 w-4" />
              Browse Catalog
            </Button>
          </Link>
          <div className="hidden items-center gap-3 md:flex">
            <Button onClick={() => scroll("left")} variant="outline" size="icon" className="h-11 w-11 rounded-full border-[#D4AF37]/45 bg-white/60 text-[#111] shadow-sm backdrop-blur hover:bg-[#D4AF37] hover:text-black">
              <ChevronLeft className="h-5 w-5" />
            </Button>
            <Button onClick={() => scroll("right")} variant="outline" size="icon" className="h-11 w-11 rounded-full border-[#D4AF37]/45 bg-white/60 text-[#111] shadow-sm backdrop-blur hover:bg-[#D4AF37] hover:text-black">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {loading && (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div key={item} className="h-[420px] rounded-[2rem] border border-[#D4AF37]/20 bg-white/60 shadow-sm animate-pulse" />
            ))}
          </div>
        )}

        {!loading && categories.length === 0 && (
          <ComingSoon
            title="Product collections coming soon"
            description="Categories added from the admin dashboard will appear here automatically."
          />
        )}

        {categories.length > 0 && (
          <div
            ref={scrollRef}
            className="scrollbar-hide flex gap-6 overflow-x-auto pb-4 scroll-smooth"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {categories.map((category, index) => {
              const Icon = category.icon || Gem;
              return (
                <Link
                  key={category.id}
                  to={`/category/${category.slug}`}
                  className="group flex-shrink-0 w-[82vw] max-w-[390px]"
                >
                  <article className="relative h-[430px] overflow-hidden rounded-[2rem] border border-[#D4AF37]/25 bg-[#090909] shadow-[0_24px_70px_rgba(30,24,12,0.18)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_32px_90px_rgba(30,24,12,0.28)]">
                    <img
                      src={category.image_url || "/images/products/ganesh-new-top.png"}
                      alt={category.name}
                      loading="lazy"
                      className="absolute inset-0 h-full w-full object-cover opacity-85 transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04)_0%,rgba(0,0,0,0.38)_45%,rgba(0,0,0,0.92)_100%)]" />
                    <div className="absolute inset-x-5 top-5 flex items-center justify-between">
                      <span className="rounded-full border border-[#D4AF37]/40 bg-black/35 px-3 py-1 text-[10px] font-black uppercase tracking-[0.18em] text-[#F5CD73] backdrop-blur">
                        0{(index % 6) + 1}
                      </span>
                      <span className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D4AF37]/35 bg-white/10 text-[#F5CD73] backdrop-blur transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110">
                        <Icon className="h-5 w-5" />
                      </span>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <h3 className="font-['Playfair_Display',Georgia,serif] text-3xl font-semibold tracking-[-0.035em] text-white">
                        {category.name}
                      </h3>
                      <p className="mt-3 min-h-[3.5rem] text-sm leading-6 text-white/74">
                        {category.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between border-t border-white/12 pt-4 text-xs font-black uppercase tracking-[0.14em] text-[#F5CD73]">
                        <span>Explore Designs</span>
                        <ArrowUpRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductsSection;
