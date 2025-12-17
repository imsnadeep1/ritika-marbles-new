import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
  uploadCategoryImage,
} from "@/services/categories";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);

  const [form, setForm] = useState({
    name: "",
    description: "",
    imageFile: null,
  });

  // Load categories
  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
    }
    load();
  }, []);

  // Handle Form Input
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, imageFile: e.target.files?.[0] || null });

  // Submit Category
  async function handleAdd(e) {
    e.preventDefault();

    try {
      let image_url = null;

      // Upload image if selected
      if (form.imageFile) {
        image_url = await uploadCategoryImage(form.imageFile);
      }

      // Generate slug
      const slug = form.name.toLowerCase().replace(/\s+/g, "-");

      // Prepare payload
      const payload = {
        name: form.name,
        slug,
        description: form.description,
        image_url,
      };

      await addCategory(payload);

      alert("Category added successfully");
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Failed to add category, check console.");
    }
  }

  // Delete Category
  async function handleDelete(id) {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      window.location.reload();
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories Admin</h1>

      {/* Add Category Form */}
      <form onSubmit={handleAdd} className="space-y-3 border p-4 rounded">
        <input
          name="name"
          placeholder="Category Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Category Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />

        <input type="file" onChange={handleFileChange} />

        <button className="px-4 py-2 bg-black text-white w-full">
          Add Category
        </button>
      </form>

      {/* Category List */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Category List</h2>

      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border rounded p-3 mb-3 flex items-center gap-4"
        >
          <img
            src={cat.image_url || "/images/placeholder.jpg"}
            alt={cat.name}
            className="w-16 h-16 rounded object-cover"
          />

          <div className="flex-1">
            <p className="font-bold">{cat.name}</p>
            <p className="text-sm text-gray-600 line-clamp-2">
              {cat.description}
            </p>
            <p className="text-xs text-gray-400">{cat.slug}</p>
          </div>

          <button
            onClick={() => handleDelete(cat.id)}
            className="px-3 py-1 bg-red-500 text-white rounded"
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
};

export default CategoriesAdmin;
