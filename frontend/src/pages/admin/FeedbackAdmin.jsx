import { useEffect, useState } from "react";
import { getAllFeedback } from "../../services/feedback";

export default function FeedbackAdmin() {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAllFeedback();
      setFeedback(data);
    }
    load();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Customer Feedback</h2>

      {feedback.map((fb) => (
        <div key={fb.id} className="border rounded p-3 mb-3">
          <p><strong>Product:</strong> {fb.products?.name}</p>
          <p><strong>Name:</strong> {fb.name}</p>
          <p><strong>Email:</strong> {fb.email}</p>
          <p><strong>Rating:</strong> {"⭐".repeat(fb.rating)}</p>
          <p><strong>Message:</strong> {fb.message}</p>
          <small className="text-gray-500">
            {new Date(fb.created_at).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
}
