import React, { useEffect, useState } from "react";
import { supabase } from "../../lib/supabaseClient";

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('feedback')
      .select(`
        id,
        name,
        rating,
        message,
        approved,
        products (
          id,
          name,
          slug
        )
      `)
      .eq('approved', true)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching feedback:", error);
    } else {
      setFeedbacks(data || []);
    }

    setLoading(false);
  };

  const toggleApproval = async (id, approved) => {
    const { error } = await supabase
      .from("feedback")
      .update({ approved: !approved })
      .eq("id", id);

    if (error) {
      alert("Failed to update approval");
      console.error(error);
    } else {
      fetchFeedbacks();
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6">
        Customer Feedback Moderation
      </h1>

      {loading ? (
        <p>Loading feedback...</p>
      ) : feedbacks.length === 0 ? (
        <p className="text-gray-500">No feedback found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-sm">
              <tr>
                <th className="p-3 text-left">Customer</th>
                <th className="p-3 text-left">Product</th>
                <th className="p-3 text-left">Rating</th>
                <th className="p-3 text-left">Message</th>
                <th className="p-3 text-left">Status</th>
                <th className="p-3 text-left">Action</th>
              </tr>
            </thead>

            <tbody>
              {feedbacks.map((f) => (
                <tr
                  key={f.id}
                  className="border-t text-sm hover:bg-gray-50 align-top"
                >
                  <td className="p-3 font-medium">{f.name}</td>

                  <td className="p-3">
                    {f.products?.name || (
                      <span className="text-gray-400">Unknown</span>
                    )}
                  </td>

                  <td className="p-3">{f.rating} ⭐</td>

                  <td className="p-3 max-w-md text-gray-700">
                    {f.message}
                  </td>

                  <td className="p-3">
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        f.approved
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {f.approved ? "Approved" : "Pending"}
                    </span>
                  </td>
                  
                  <td className="p-3">
                    <button
                      type="button"
                      onClick={() => toggleApproval(f.id, !!f.approved)}
                      className="px-3 py-1 text-xs rounded font-medium bg-blue-600 text-white hover:bg-blue-700"
                    >
                      {f.approved ? "Mark as Pending" : "Approve"}
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FeedbackAdmin;
