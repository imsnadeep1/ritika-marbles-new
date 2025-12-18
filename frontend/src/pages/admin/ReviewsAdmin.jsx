import React, { useEffect, useState } from "react";
import { getAllReviews, approveReview, deleteReview } from "@/services/reviews";

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getAllReviews().then(setReviews);
  }, []);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Client Diaries (Reviews)</h1>

      {reviews.map((r) => (
        <div key={r.id} className="border p-4 rounded mb-3">
          <p className="font-semibold">{r.customer_name}</p>
          <p className="text-sm text-gray-600">⭐ {r.rating}/5</p>
          <p className="my-2">{r.review}</p>

          <div className="flex gap-3">
            {!r.approved && (
              <button
                onClick={() => approveReview(r.id)}
                className="bg-green-600 text-white px-3 py-1 rounded"
              >
                Approve
              </button>
            )}
            <button
              onClick={() => deleteReview(r.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ReviewsAdmin;
