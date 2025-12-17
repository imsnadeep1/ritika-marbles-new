import React, { useEffect, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
} from "@/services/products";
import { getCategories } from "@/services/categories";

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // Form state
  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category_id: "",
    imageFile: null,
  });

  const [editingId, setEditingId] = useState(null);

  // ---------------- LOAD DATA ----------------
  useEffect(() => {
    async function load() {
      const prod = await getProducts();
      const cats = await getCategories();
      setProducts(prod);
      setCategories(cats);
    }
    load();
  }, []);

  // ---------------- HANDLE FORM CHANGE ----------------
  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, imageFile: e.target.files[0] });

  // ---------------- SUBMIT ----------------
  async function handleSubmit(e) {
  e.preventDefault();

  let image_url = null;

  if (form.imageFile) {
    image_url = await uploadProductImage(form.imageFile);
  }

  // Generate slug from product name
  const slug = form.name.toLowerCase().replace(/\s+/g, "-");

  const payload = {
    name: form.name,
    price: Number(form.price),
    description: form.description,
    category_id: form.category_id,
    image_url,
    slug
  };

  if (editingId) {
    await updateProduct(editingId, payload);
    alert("Product updated");
  } else {
    await addProduct(payload);
    alert("Product added");
  }

  window.location.reload();
}


  // ---------------- EDIT ----------------
  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name,
      price: product.price,
      description: product.description,
      category_id: product.category_id,
      imageFile: null,
    });
  }

  // ---------------- DELETE ----------------
  async function handleDelete(id) {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      window.location.reload();
    }
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Products Admin</h1>

      {/* FORM */}
      <form onSubmit={handleSubmit} className="space-y-3 border p-4 rounded">
        <input
          name="name"
          placeholder="Product Name"
          className="border p-2 w-full"
          value={form.name}
          onChange={handleChange}
          required
        />

        <input
          name="price"
          placeholder="Price"
          className="border p-2 w-full"
          value={form.price}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Description"
          className="border p-2 w-full"
          value={form.description}
          onChange={handleChange}
        />

        {/* Category Dropdown */}
        <select
          name="category_id"
          className="border p-2 w-full"
          value={form.category_id}
          onChange={handleChange}
          required
        >
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option value={cat.id} key={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>

        <input type="file" onChange={handleFileChange} />

        <button className="px-4 py-2 bg-black text-white w-full">
          {editingId ? "Update Product" : "Add Product"}
        </button>
      </form>

      {/* LIST */}
      <h2 className="text-xl font-semibold mt-8 mb-3">Product List</h2>

      {products.map((product) => (
        <div key={product.id} className="border rounded p-3 mb-3 flex gap-4">
          <img
            src={product.image_url}
            alt=""
            className="w-20 h-20 object-cover rounded"
          />

          <div className="flex-1">
            <p className="font-bold">{product.name}</p>
            <p>₹{product.price}</p>
            <p className="text-sm text-gray-500">{product.description}</p>
          </div>

          <div className="flex flex-col gap-2">
            <button
              className="px-3 py-1 bg-yellow-500 text-white rounded"
              onClick={() => handleEdit(product)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded"
              onClick={() => handleDelete(product.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductsAdmin;
