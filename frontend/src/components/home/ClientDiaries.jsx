import React, { useEffect, useState } from 'react';
import { getApprovedProductReviews } from '@/services/reviews';
import { Star } from 'lucide-react';
import { Link } from 'react-router-dom';

const ClientDiaries = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getApprovedProductReviews().then(setReviews);
  }, []);

  if (!reviews.length) return null;

  return (
    <section className="bg-[#1a5d4c] py-6 overflow-hidden">
      <div className="flex gap-8 px-6 animate-marquee">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="min-w-[320px] max-w-[420px] bg-white rounded-xl p-5 shadow flex-shrink-0"
          >
            <p className="text-gray-700 italic mb-3 line-clamp-3">
              “{r.message}”
            </p>

            <div className="flex items-center gap-1 mb-2">
              {[...Array(r.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-4 h-4 fill-[#c9a962] text-[#c9a962]"
                />
              ))}
            </div>

            {r.products && (
              <Link
                to={`/products/${r.products.slug}`}
                className="text-sm font-semibold text-[#1a5d4c] hover:underline"
              >
                {r.products.name}
              </Link>
            )}

            <p className="text-xs text-gray-500 mt-1">
              — {r.name}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ClientDiaries;
