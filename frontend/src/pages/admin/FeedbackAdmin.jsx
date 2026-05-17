import React, { useEffect, useState } from "react";
import { CheckCircle, MessageSquare, Search, Star, Trash2, XCircle } from "lucide-react";
import { supabase } from "../../lib/supabaseClient";

const FeedbackAdmin = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  const fetchFeedbacks = async () => {
    setLoading(true);
    setStatus("");

    if (!supabase) {
      setFeedbacks([]);
      setLoading(false);
      setStatus("Supabase is not configured. Customer requests cannot be loaded.");
      return;
    }

    const { data, error } = await supabase
      .from('feedback')
      .select(`
        id,
        name,
        rating,
        message,
        approved,
        created_at,
        products (
          id,
          name,
          slug
        )
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error("Error fetching feedback:", error);
      setStatus(error.message || "Unable to load customer feedback.");
    } else {
      setFeedbacks(data || []);
    }

    setLoading(false);
  };

  const toggleApproval = async (id, approved) => {
    if (!supabase) return;
    const { error } = await supabase
      .from("feedback")
      .update({ approved: !approved })
      .eq("id", id);

    if (error) {
      console.error(error);
      setStatus(error.message || "Failed to update request status.");
    } else {
      fetchFeedbacks();
    }
  };

  const deleteFeedback = async (id) => {
    if (!supabase || !window.confirm("Delete this customer request?")) return;
    const { error } = await supabase.from("feedback").delete().eq("id", id);
    if (error) {
      console.error(error);
      setStatus(error.message || "Failed to delete customer request.");
    } else {
      fetchFeedbacks();
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const filteredFeedbacks = feedbacks.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "approved" && item.approved) ||
      (filter === "pending" && !item.approved);
    const query = search.toLowerCase();
    const matchesSearch =
      !query ||
      item.name?.toLowerCase().includes(query) ||
      item.message?.toLowerCase().includes(query) ||
      item.products?.name?.toLowerCase().includes(query);
    return matchesFilter && matchesSearch;
  });

  const approvedCount = feedbacks.filter((item) => item.approved).length;
  const pendingCount = feedbacks.length - approvedCount;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
              Customer activity
            </p>
            <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">
              Requests, feedback and moderation
            </h1>
            <p className="text-slate-500 mt-2">
              Track product feedback, customer messages, approvals and follow-up activity.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 min-w-[320px]">
            <div className="rounded-2xl bg-[#F8F1E8] p-4 text-center">
              <p className="text-2xl font-bold text-[#1F3D36]">{feedbacks.length}</p>
              <p className="text-xs text-slate-500">Total</p>
            </div>
            <div className="rounded-2xl bg-green-50 p-4 text-center">
              <p className="text-2xl font-bold text-green-700">{approvedCount}</p>
              <p className="text-xs text-slate-500">Approved</p>
            </div>
            <div className="rounded-2xl bg-orange-50 p-4 text-center">
              <p className="text-2xl font-bold text-orange-700">{pendingCount}</p>
              <p className="text-xs text-slate-500">Pending</p>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div className="relative flex-1 max-w-xl">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by customer, product or message"
              className="w-full rounded-full border border-[#DDE8E2] py-2.5 pl-10 pr-4 outline-none focus:border-[#1F3D36]"
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-[#DDE8E2] px-4 py-2.5 outline-none focus:border-[#1F3D36]"
          >
            <option value="all">All requests</option>
            <option value="pending">Pending only</option>
            <option value="approved">Approved only</option>
          </select>
        </div>

        {status && (
          <div className="mb-5 rounded-2xl bg-[#F8F1E8] px-4 py-3 text-sm font-medium text-[#1F3D36]">
            {status}
          </div>
        )}

      {loading ? (
          <p className="text-slate-500">Loading customer requests...</p>
      ) : filteredFeedbacks.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <MessageSquare className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            No matching customer requests found.
          </div>
      ) : (
        <div className="overflow-x-auto">
            <table className="w-full min-w-[920px]">
              <thead className="border-b border-[#EEF3EF] text-sm text-slate-500">
              <tr>
                  <th className="p-3 text-left">Customer</th>
                  <th className="p-3 text-left">Product</th>
                  <th className="p-3 text-left">Rating</th>
                  <th className="p-3 text-left">Message</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
                {filteredFeedbacks.map((f) => (
                <tr
                  key={f.id}
                    className="border-b border-[#EEF3EF] text-sm hover:bg-[#F8FBF9] align-top"
                >
                    <td className="p-3">
                      <p className="font-semibold text-[#1F3D36]">{f.name || "Anonymous"}</p>
                      <p className="text-xs text-slate-400">
                        {f.created_at ? new Date(f.created_at).toLocaleDateString() : "No date"}
                      </p>
                    </td>

                  <td className="p-3">
                    {f.products?.name || (
                        <span className="text-slate-400">Unknown</span>
                    )}
                  </td>

                    <td className="p-3">
                      <span className="inline-flex items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 font-semibold text-[#B8872F]">
                        <Star className="w-3 h-3 fill-current" />
                        {f.rating || "-"}
                      </span>
                    </td>

                    <td className="p-3 max-w-md text-slate-600">
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
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => toggleApproval(f.id, !!f.approved)}
                          className={`inline-flex items-center gap-1 rounded-full px-3 py-2 text-xs font-semibold ${
                            f.approved
                              ? "bg-orange-50 text-orange-700 hover:bg-orange-100"
                              : "bg-green-50 text-green-700 hover:bg-green-100"
                          }`}
                        >
                          {f.approved ? <XCircle className="w-3 h-3" /> : <CheckCircle className="w-3 h-3" />}
                          {f.approved ? "Mark pending" : "Approve"}
                        </button>
                        <button
                          type="button"
                          onClick={() => deleteFeedback(f.id)}
                          className="inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-xs font-semibold text-red-700 hover:bg-red-100"
                        >
                          <Trash2 className="w-3 h-3" />
                          Delete
                        </button>
                      </div>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      </section>
    </div>
  );
};

export default FeedbackAdmin;
