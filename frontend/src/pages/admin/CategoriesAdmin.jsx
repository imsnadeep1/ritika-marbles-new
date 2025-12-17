import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  deleteCategory,
} from "@/services/categories";

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");

  useEffect(() => {
    async function load() {
      const data = await getCategories();
      setCategories(data);
    }
    load();
  }, []);

  async function handleAdd(e) {
    e.preventDefault();
    await addCategory({ name });
    alert("Category added");
    window.location.reload();
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      window.location.reload();
    }
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Categories Admin</h1>

      {/* Add Form */}
      <form onSubmit={handleAdd} className="space-y-3 border p-4 rounded">
        <input
          placeholder="Category Name"
          className="border p-2 w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <button className="px-4 py-2 bg-black text-white w-full">
          Add Category
        </button>
      </form>

      {/* List */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Category List</h2>
      {categories.map((cat) => (
        <div
          key={cat.id}
          className="border rounded p-3 mb-2 flex justify-between"
        >
          <span>{cat.name}</span>
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
