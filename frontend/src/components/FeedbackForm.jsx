import { useState } from "react";
import { addFeedback } from "../services/feedback";

export default function FeedbackForm({ productId }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    rating: 5,
    message: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  async function handleSubmit(e) {
    e.preventDefault();
    await addFeedback({ ...form, product_id: productId });

    alert("Thanks for your feedback!");
    setForm({ name: "", email: "", rating: 5, message: "" });
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-2 p-4 border rounded">
      <input
        name="name"
        placeholder="Your name"
        className="border p-2 w-full"
        value={form.name}
        onChange={handleChange}
      />

      <input
        name="email"
        placeholder="Email"
        className="border p-2 w-full"
        value={form.email}
        onChange={handleChange}
      />

      <select
        name="rating"
        className="border p-2 w-full"
        value={form.rating}
        onChange={handleChange}
      >
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>{r} Stars</option>
        ))}
      </select>

      <textarea
        name="message"
        placeholder="Your feedback"
        className="border p-2 w-full"
        value={form.message}
        onChange={handleChange}
        required
      />

      <button className="px-4 py-2 bg-black text-white w-full">
        Submit Feedback
      </button>
    </form>
  );
}
