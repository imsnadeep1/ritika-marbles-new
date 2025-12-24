import React, { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

const AdminFeedback = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchFeedbacks = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('feedback')
      .select(`
        id,
        name,
        message,
        rating,
        approved,
        created_at,
        products (
          id,
          name
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Fetch feedback error:', error);
    } else {
      setFeedbacks(data);
    }

    setLoading(false);
  };

  const toggleApproval = async (id, currentStatus) => {
    const { error } = await supabase
      .from('feedback')
      .update({ approved: !currentStatus })
      .eq('id', id);

    if (error) {
      console.error('Approval update failed:', error);
      alert('Failed to update approval');
    } else {
      fetchFeedbacks(); // refresh list
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
        <p className="text-gray-500">No feedback available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100">
              <tr className="text-left text-sm">
                <th className="p-3">Customer</th>
                <th className="p-3">Product</th>
                <th className="p-3">Rating</th>
                <th className="p-3">Message</th>
                <th className="p-3">Status</th>
                <th className="p-3">Action</th>
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
                    {f.approved ? (
                      <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">
                        Approved
                      </span>
                    ) : (
                      <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
                        Pending
                      </span>
                    )}
                  </td>

                  <td className="p-3">
                    <button
                      onClick={() => toggleApproval(f.id, f.approved)}
                      className={`px-3 py-1 text-xs rounded font-medium ${
                        f.approved
                          ? 'bg-red-500 text-white hover:bg-red-600'
                          : 'bg-green-600 text-white hover:bg-green-700'
                      }`}
                    >
                      {f.approved ? 'Unapprove' : 'Approve'}
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

export default AdminFeedback;
