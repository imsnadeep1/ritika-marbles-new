import React, { useEffect, useState } from "react";
import { getAllFeedback } from "@/services/feedback";

const FeedbackAdmin = () => {
  const [feedback, setFeedback] = useState([]);

  useEffect(() => {
    async function load() {
      const data = await getAllFeedback();
      setFeedback(data);
    }
    load();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Customer Feedback</h1>

      {feedback.map((fb) => (
        <div key={fb.id} className="border rounded p-4 mb-4">
          <p>
            <strong>Product:</strong> {fb.products?.name}
          </p>
          <p>
            <strong>Name:</strong> {fb.name || "Anonymous"}
          </p>
          <p>
            <strong>Email:</strong> {fb.email}
          </p>
          <p>
            <strong>Rating:</strong> {"⭐".repeat(fb.rating)}
          </p>
          <p className="mt-2">
            <strong>Message:</strong> {fb.message}
          </p>
          <p className="text-sm text-gray-500 mt-2">
            {new Date(fb.created_at).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeedbackAdmin;
