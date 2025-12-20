import React, { useEffect, useState } from "react";
import { getApprovedReviews } from "@/services/reviews";

const ClientDiaries = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getApprovedReviews().then(setReviews);
  }, []);

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1a5d4c] mb-14 text-center">
          Client Diaries
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((r) => (
            <div
              key={r.id}
              className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition h-full flex flex-col"
            >
              <p className="text-gray-600 italic leading-relaxed flex-grow">
                “{r.review}”
              </p>

              <div className="mt-6">
                <p className="font-semibold text-[#1a5d4c]">
                  {r.customer_name}
                </p>
                <p className="text-sm text-gray-500 flex items-center gap-1 mt-1">
                  <span className="text-[#D4A853]">★</span> {r.rating} / 5
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClientDiaries;
