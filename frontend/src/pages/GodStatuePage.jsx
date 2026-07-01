import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import ComingSoon from '@/components/ComingSoon';
import { ArrowRight } from 'lucide-react';
import { getCategories } from '@/services/categories';
import { getProducts } from '@/services/products';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';
import { CATEGORY_GROUPS, getCategoryHref, getVisibleCategories } from '@/lib/categories';
import { getProductCoverImage } from '@/lib/products';

const PAGE_CONTENT = {
  [CATEGORY_GROUPS.GOD_STATUES]: {
    eyebrow: 'Devotional marble art',
    emptyTitle: 'God statue collections coming soon',
    emptyDescription: 'Enabled God Statue collections will appear here once they are configured from the admin dashboard.',
  },
  [CATEGORY_GROUPS.MARBLE_COLLECTIONS]: {
    eyebrow: 'Handcrafted marble collections',
    title: 'Marble Collections',
    description: 'Explore marble temples, handcrafted decor, and custom pieces created for homes, gifting, and heritage interiors.',
    emptyTitle: 'Marble collections coming soon',
    emptyDescription: 'Enabled Marble Collection categories will appear here once they are configured from the admin dashboard.',
  },
};

const GodStatuePage = ({ group = CATEGORY_GROUPS.GOD_STATUES }) => {
  const pageContent = PAGE_CONTENT[group];
  const [content, setContent] = useState(defaultStorefrontContent.godStatues);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const searchQuery = (searchParams.get('q') || '').trim();

  const [products, setProducts] = useState([]);
  const [productsLoading, setProductsLoading] = useState(false);

  useEffect(() => {
    getStorefrontContent().then((data) => setContent(data.godStatues));
    getCategories()
      .then((data) => setCategories(getVisibleCategories(data, { group })))
      .catch((error) => console.error('Failed to load collections:', error))
      .finally(() => setLoading(false));
  }, [group]);

  useEffect(() => {
    if (!searchQuery) return;
    setProductsLoading(true);
    getProducts()
      .then((data) => setProducts(data || []))
      .catch((error) => console.error('Failed to load products:', error))
      .finally(() => setProductsLoading(false));
  }, [searchQuery]);

  const title = pageContent.title || content.title;
  const description = pageContent.description || content.description;

  const term = searchQuery.toLowerCase();
  const searchResults = searchQuery
    ? products.filter((product) =>
        [product.name, product.description, product.categories?.name]
          .filter(Boolean)
          .some((field) => String(field).toLowerCase().includes(term)),
      )
    : [];

  if (searchQuery) {
    return (
      <div className="min-h-screen">
        <Header />
        <main>
          <section className="bg-[#1F3D36] py-16 sm:py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.25em] mb-3">Search results</p>
              <h1 className="text-3xl md:text-5xl font-bold text-[#D4A853] mb-4 break-words">“{searchQuery}”</h1>
              <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">
                {productsLoading ? 'Searching our catalog…' : `${searchResults.length} product${searchResults.length === 1 ? '' : 's'} found`}
              </p>
            </div>
          </section>

          <section className="py-14 sm:py-20 bg-[#FDF8F3]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {productsLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {[1, 2, 3, 4].map((item) => <div key={item} className="aspect-square rounded-xl bg-[#F8F1E8] animate-pulse" />)}
                </div>
              ) : searchResults.length === 0 ? (
                <ComingSoon
                  title="No matching products"
                  description="Try a different keyword, or browse our collections from the menu."
                />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                  {searchResults.map((product) => (
                    <Link key={product.id} to={product.slug ? `/product/${product.slug}` : '/god-statue'} className="group">
                      <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                        <div className="aspect-[4/5] overflow-hidden bg-[#F8F1E8] flex items-center justify-center p-3">
                          <img src={getProductCoverImage(product)} alt={product.name} className="max-w-full max-h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div className="p-4">
                          <h3 className="text-[#1F3D36] font-semibold line-clamp-2 min-h-[3rem]">{product.name}</h3>
                          {product.price ? (
                            <p className="mt-2 font-bold text-[#B8872F]">₹{Number(product.price).toLocaleString()}</p>
                          ) : null}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </section>
        </main>
        <Footer />
        <FloatingButtons />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-[#1F3D36] py-14 sm:py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#F8D98E] text-xs sm:text-sm font-bold uppercase tracking-[0.25em] mb-3">{pageContent.eyebrow}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#D4A853] mb-4">{title}</h1>
            <p className="text-white/80 text-base sm:text-lg max-w-2xl mx-auto">{description}</p>
            {!loading && categories.length > 0 && (
              <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white">
                <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
                {categories.length} collection{categories.length === 1 ? '' : 's'} to explore
              </p>
            )}
          </div>
        </section>

        <section className="py-12 sm:py-20 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {[1, 2, 3, 4].map((item) => <div key={item} className="aspect-[3/4] rounded-xl bg-[#F8F1E8] animate-pulse" />)}
              </div>
            ) : categories.length === 0 ? (
              <ComingSoon title={pageContent.emptyTitle} description={pageContent.emptyDescription} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
                {categories.map((category) => (
                  <Link key={category.id} to={getCategoryHref(category)} className="group">
                    <article className="bg-white rounded-[1.25rem] sm:rounded-xl overflow-hidden shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full flex flex-col">
                      <div className="aspect-square overflow-hidden bg-[#F8F1E8] relative">
                        <img src={category.image_url || '/images/placeholder.jpg'} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#10221E]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-[#1F3D36] shadow-sm">
                          Collection
                        </span>
                      </div>
                      <div className="p-4 sm:p-5 bg-white flex-1 flex flex-col">
                        <h3 className="text-[#1F3D36] font-semibold text-base sm:text-lg group-hover:text-[#B8872F] transition-colors">
                          {category.name}
                        </h3>
                        {category.description && (
                          <p className="mt-2 text-sm text-slate-500 line-clamp-2 flex-1">
                            {category.description}
                          </p>
                        )}
                        <p className="mt-4 text-sm font-semibold text-[#B8872F] inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                          Browse collection
                          <ArrowRight className="w-4 h-4" />
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-[#1F3D36] mb-4">{content.ctaTitle}</h2>
            <p className="text-gray-600 mb-8">{content.ctaDescription}</p>
            <Link to="/contact" className="inline-block bg-[#D4A853] hover:bg-[#B8923F] text-white px-8 py-3 rounded-full font-medium transition-colors">
              Get Custom Quote
            </Link>
          </div>
        </section>
      </main>
      <Footer />
      <FloatingButtons />
    </div>
  );
};

export default GodStatuePage;
