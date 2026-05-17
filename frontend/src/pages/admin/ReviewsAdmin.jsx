import React, { useEffect, useMemo, useState } from "react";
import { CheckCircle, Search, Star, Trash2, XCircle } from "lucide-react";
import { getAllReviews, approveReview, deleteReview } from "@/services/reviews";

const ReviewsAdmin = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");

  async function loadReviews() {
    setLoading(true);
    try {
      const data = await getAllReviews();
      setReviews(data || []);
    } catch (error) {
      console.error("Failed to load reviews:", error);
      setStatus("Unable to load reviews.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadReviews();
  }, []);

  const filteredReviews = useMemo(() => {
    return reviews.filter((review) => {
      const matchesFilter =
        filter === "all" ||
        (filter === "approved" && review.approved) ||
        (filter === "pending" && !review.approved);
      const query = search.toLowerCase();
      const matchesSearch =
        !query ||
        review.customer_name?.toLowerCase().includes(query) ||
        review.review?.toLowerCase().includes(query);
      return matchesFilter && matchesSearch;
    });
  }, [reviews, filter, search]);

  async function handleApprove(id) {
    await approveReview(id);
    await loadReviews();
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this review?")) return;
    await deleteReview(id);
    await loadReviews();
  }

  const approvedCount = reviews.filter((review) => review.approved).length;
  const pendingCount = reviews.length - approvedCount;

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
              Client diaries
            </p>
            <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">
              Review moderation
            </h1>
            <p className="text-slate-500 mt-2">
              Approve customer stories before they appear on the storefront.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-3 min-w-[320px]">
            <div className="rounded-2xl bg-[#F8F1E8] p-4 text-center">
              <p className="text-2xl font-bold text-[#1F3D36]">{reviews.length}</p>
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
              placeholder="Search reviews"
              className="w-full rounded-full border border-[#DDE8E2] py-2.5 pl-10 pr-4 outline-none focus:border-[#1F3D36]"
            />
          </div>
          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-full border border-[#DDE8E2] px-4 py-2.5 outline-none focus:border-[#1F3D36]"
          >
            <option value="all">All reviews</option>
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
          <p className="text-slate-500">Loading reviews...</p>
        ) : filteredReviews.length === 0 ? (
          <div className="py-12 text-center text-slate-500">
            <Star className="w-10 h-10 mx-auto mb-3 text-slate-300" />
            No matching reviews found.
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-5">
            {filteredReviews.map((review) => (
              <article key={review.id} className="rounded-3xl border border-[#DDE8E2] p-5 shadow-sm">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="font-bold text-[#1F3D36]">
                      {review.customer_name || "Anonymous customer"}
                    </h2>
                    <div className="mt-2 inline-flex items-center gap-1 rounded-full bg-[#FFF7E8] px-3 py-1 text-sm font-semibold text-[#B8872F]">
                      <Star className="w-4 h-4 fill-current" />
                      {review.rating || "-"} / 5
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                    review.approved
                      ? "bg-green-50 text-green-700"
                      : "bg-orange-50 text-orange-700"
                  }`}>
                    {review.approved ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                    {review.approved ? "Approved" : "Pending"}
                  </span>
                </div>
                <p className="mt-4 text-slate-600 leading-relaxed">
                  {review.review || "No review text provided."}
                </p>
                <div className="mt-5 flex justify-end gap-2">
                  {!review.approved && (
                    <button
                      onClick={() => handleApprove(review.id)}
                      className="inline-flex items-center gap-1 rounded-full bg-green-50 px-4 py-2 text-sm font-semibold text-green-700 hover:bg-green-100"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Approve
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(review.id)}
                    className="inline-flex items-center gap-1 rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default ReviewsAdmin;
