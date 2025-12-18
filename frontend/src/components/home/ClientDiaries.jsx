import React, { useEffect, useState } from "react";
import { getApprovedReviews } from "@/services/reviews";

const ClientDiaries = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getApprovedReviews().then(setReviews);
  }, []);

  return (
    <section className="py-20 bg-[#FFFBF5]">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-[#7B2D3A] mb-12 text-center">
          Client Diaries
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map(r => (
            <div key={r.id} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 italic">“{r.review}”</p>
              <p className="mt-4 font-semibold text-[#7B2D3A]">
                — {r.customer_name}
              </p>
              <p className="text-sm text-[#D4A853]">⭐ {r.rating}/5</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientDiaries;
