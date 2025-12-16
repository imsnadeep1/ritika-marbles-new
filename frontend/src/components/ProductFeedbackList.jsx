import { useEffect, useState } from "react";
import { getFeedbackByProduct } from "../services/feedback";

export default function ProductFeedbackList({ productId }) {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getFeedbackByProduct(productId);
      setFeedback(data);
    }
    load();
  }, [productId]);

  return (
    <div className="mt-4">
      <h3 className="font-bold text-lg mb-2">Customer Reviews</h3>

      {feedback.length === 0 && <p>No reviews yet.</p>}

      {feedback.map((fb) => (
        <div key={fb.id} className="border p-3 rounded mb-2">
          <p className="font-semibold">{fb.name || "Anonymous"}</p>
          <p className="text-yellow-500">{"⭐".repeat(fb.rating)}</p>
          <p>{fb.message}</p>
          <span className="text-xs text-gray-500">
            {new Date(fb.created_at).toLocaleString()}
          </span>
        </div>
      ))}
    </div>
  );
}
