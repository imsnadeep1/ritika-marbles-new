import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import FloatingButtons from '@/components/layout/FloatingButtons';
import ComingSoon from '@/components/ComingSoon';
import { getCategories } from '@/services/categories';
import { defaultStorefrontContent, getStorefrontContent } from '@/services/storefrontContent';
import { CATEGORY_GROUPS, getCategoryHref, getVisibleCategories } from '@/lib/categories';

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

  useEffect(() => {
    getStorefrontContent().then((data) => setContent(data.godStatues));
    getCategories()
      .then((data) => setCategories(getVisibleCategories(data, { group })))
      .catch((error) => console.error('Failed to load collections:', error))
      .finally(() => setLoading(false));
  }, [group]);

  const title = pageContent.title || content.title;
  const description = pageContent.description || content.description;

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <section className="bg-[#1F3D36] py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-[#F8D98E] text-sm font-bold uppercase tracking-[0.25em] mb-3">{pageContent.eyebrow}</p>
            <h1 className="text-4xl md:text-5xl font-bold text-[#D4A853] mb-4">{title}</h1>
            <p className="text-white/80 text-lg max-w-2xl mx-auto">{description}</p>
          </div>
        </section>

        <section className="py-20 bg-[#FDF8F3]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map((item) => <div key={item} className="aspect-square rounded-xl bg-[#F8F1E8] animate-pulse" />)}
              </div>
            ) : categories.length === 0 ? (
              <ComingSoon title={pageContent.emptyTitle} description={pageContent.emptyDescription} />
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {categories.map((category) => (
                  <Link key={category.id} to={getCategoryHref(category)} className="group">
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
                      <div className="aspect-square overflow-hidden bg-[#F8F1E8]">
                        <img src={category.image_url || '/images/placeholder.jpg'} alt={category.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      </div>
                      <div className="p-4 bg-[#1F3D36]">
                        <h3 className="text-white font-medium text-center">{category.name}</h3>
                      </div>
                    </div>
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
