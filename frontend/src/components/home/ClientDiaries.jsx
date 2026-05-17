import React, { useEffect, useState } from 'react';
import { getApprovedProductReviews } from '@/services/reviews';
import { Quote, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import ComingSoon from '@/components/ComingSoon';

const ClientDiaries = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
  getApprovedProductReviews().then((data) => {
    setReviews(data);
  });
}, []);


  if (!reviews.length) {
    return (
      <section className="bg-[#F8F1E8] py-16 px-4">
        <div className="max-w-5xl mx-auto">
          <ComingSoon
            title="Client diaries coming soon"
            description="Approved customer stories and product experiences will show here once they are added from the admin dashboard."
          />
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#10221E] via-[#1F3D36] to-[#10221E] py-16">
      <div className="absolute left-10 top-8 h-32 w-32 rounded-full bg-[#D4A853]/10 blur-3xl" />
      <div className="absolute bottom-8 right-10 h-40 w-40 rounded-full bg-white/5 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 text-center mb-10">
        <p className="text-[#D4A853] text-sm font-bold uppercase tracking-[0.25em] mb-3">
          Client diaries
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-white">
          Stories from our customers
        </h2>
        <p className="mt-4 text-white/70 max-w-2xl mx-auto">
          Real feedback from homes, temples, and design projects that trusted our marble craftsmanship.
        </p>
      </div>

      <div className="relative z-10 flex gap-6 px-6 animate-marquee">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="min-w-[320px] max-w-[440px] bg-white rounded-[1.75rem] p-6 shadow-xl flex-shrink-0 border border-[#E8D9C5]"
          >
            <Quote className="w-8 h-8 text-[#D4A853] mb-4" />
            <p className="text-slate-700 italic mb-4 line-clamp-3 leading-relaxed">
              “{r.message}”
            </p>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(r.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#D4A853] text-[#D4A853]"
                />
              ))}
            </div>

            {r.products && (
              <Link
                to={`/product/${r.products.slug}`}
                className="text-sm font-semibold text-[#1F3D36] hover:text-[#B8872F]"
              >
                {r.products.name}
              </Link>
            )}

            <p className="text-xs text-slate-500 mt-2">
              — {r.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientDiaries;
