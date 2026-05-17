import React, { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  uploadProductVideo,
} from "@/services/products";
import { getCategories } from "@/services/categories";
import {
  ImagePlus,
  Package,
  Pencil,
  Plus,
  Search,
  Trash2,
  UploadCloud,
  Video,
} from "lucide-react";

const emptyForm = {
  name: "",
  slug: "",
  price: "",
  description: "",
  category_id: "",
  features: "",
  image_url: "",
  video_url: "",
  imageFile: null,
  videoFile: null,
  in_stock: true,
};

const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ProductsAdmin = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [status, setStatus] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      const prod = await getProducts();
      const cats = await getCategories();
      setProducts(prod || []);
      setCategories(cats || []);
    } catch (error) {
      console.error("Failed to load product admin data:", error);
      setStatus("Unable to load products. Check Supabase configuration.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch = product.name
        ?.toLowerCase()
        .includes(search.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || product.category_id === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, search, categoryFilter]);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      let image_url = form.image_url || null;
      let video_url = form.video_url || null;

      if (form.imageFile) {
        image_url = await uploadProductImage(form.imageFile);
      }

      if (form.videoFile) {
        video_url = await uploadProductVideo(form.videoFile);
      }

      const features = form.features
        .split("\n")
        .map((feature) => feature.trim())
        .filter(Boolean);

      const payload = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        price: Number(form.price),
        description: form.description,
        category_id: form.category_id,
        image_url,
        video_url,
        features,
        in_stock: form.in_stock,
      };

      if (editingId) {
        await updateProduct(editingId, payload);
        setStatus("Product updated successfully.");
      } else {
        await addProduct(payload);
        setStatus("Product added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadData();
    } catch (error) {
      console.error("Error submitting product:", error);
      setStatus(error?.message || "Product save failed. Check Supabase columns and storage bucket permissions.");
    } finally {
      setSaving(false);
    }
  }

  function handleEdit(product) {
    setEditingId(product.id);
    setForm({
      name: product.name || "",
      slug: product.slug || "",
      price: product.price || "",
      description: product.description || "",
      category_id: product.category_id || "",
      features: Array.isArray(product.features) ? product.features.join("\n") : "",
      image_url: product.image_url || "",
      video_url: product.video_url || "",
      imageFile: null,
      videoFile: null,
      in_stock: product.in_stock ?? product.inStock ?? true,
    });
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this product?")) {
      await deleteProduct(id);
      await loadData();
    }
  }

  const getCategoryName = (categoryId) =>
    categories.find((category) => category.id === categoryId)?.name || "Uncategorized";

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
              Product management
            </p>
            <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">
              Add products, prices, images and video
            </h1>
            <p className="text-slate-500 mt-2">
              Keep the storefront catalog ready with media, custom-order details, stock status and pricing.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setForm(emptyForm);
            }}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F3D36] px-5 py-3 text-sm font-semibold text-white hover:bg-[#152C27]"
          >
            <Plus className="w-4 h-4" />
            New product
          </button>
        </div>

        {status && (
          <div className="mb-5 rounded-2xl bg-[#F8F1E8] px-4 py-3 text-sm font-medium text-[#1F3D36]">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid xl:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Product name *</span>
                <input
                  name="name"
                  className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                  value={form.name}
                  onChange={(event) => {
                    const value = event.target.value;
                    setForm({
                      ...form,
                      name: value,
                      slug: editingId ? form.slug : generateSlug(value),
                    });
                  }}
                  required
                />
              </label>
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Slug</span>
                <input
                  name="slug"
                  className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                  value={form.slug}
                  onChange={handleChange}
                  placeholder="white-marble-ganesh"
                />
              </label>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Price (₹) *</span>
                <input
                  name="price"
                  type="number"
                  min="0"
                  className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                  value={form.price}
                  onChange={handleChange}
                  required
                />
              </label>
              <label className="space-y-2 md:col-span-2">
                <span className="text-sm font-semibold text-slate-700">Category *</span>
                <select
                  name="category_id"
                  className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                  value={form.category_id}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select category</option>
                  {categories.map((cat) => (
                    <option value={cat.id} key={cat.id}>
                      {cat.name}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-slate-700">Description</span>
              <textarea
                name="description"
                rows="4"
                className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe material, size, finish, usage and customization options."
              />
            </label>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-slate-700">Features / highlights</span>
              <textarea
                name="features"
                rows="4"
                className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                value={form.features}
                onChange={handleChange}
                placeholder={"Pure Makrana marble\nHand carved\nCustom size available"}
              />
            </label>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-dashed border-[#BFD2C8] bg-[#F8FBF9] p-5">
              <div className="flex items-center gap-3 mb-4">
                <ImagePlus className="w-5 h-5 text-[#B8872F]" />
                <h2 className="font-bold text-[#1F3D36]">Product image</h2>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) =>
                  setForm({ ...form, imageFile: event.target.files?.[0] || null })
                }
                className="w-full text-sm"
              />
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="mt-3 w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 text-sm outline-none focus:border-[#1F3D36]"
              />
              {(form.image_url || form.imageFile) && (
                <p className="mt-2 text-xs text-slate-500">
                  {form.imageFile ? form.imageFile.name : "Existing image URL will be used."}
                </p>
              )}
            </div>

            <div className="rounded-3xl border border-dashed border-[#BFD2C8] bg-[#F8FBF9] p-5">
              <div className="flex items-center gap-3 mb-4">
                <Video className="w-5 h-5 text-[#B8872F]" />
                <h2 className="font-bold text-[#1F3D36]">Product video</h2>
              </div>
              <input
                type="file"
                accept="video/*"
                onChange={(event) =>
                  setForm({ ...form, videoFile: event.target.files?.[0] || null })
                }
                className="w-full text-sm"
              />
              <input
                name="video_url"
                value={form.video_url}
                onChange={handleChange}
                placeholder="Or paste YouTube / video URL"
                className="mt-3 w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 text-sm outline-none focus:border-[#1F3D36]"
              />
            </div>

            <label className="flex items-center justify-between rounded-2xl border border-[#DDE8E2] bg-white px-4 py-3">
              <span>
                <span className="block font-semibold text-[#1F3D36]">Available for sale</span>
                <span className="text-sm text-slate-500">Show as in stock / inquiry ready.</span>
              </span>
              <input
                type="checkbox"
                checked={form.in_stock}
                onChange={(event) => setForm({ ...form, in_stock: event.target.checked })}
                className="w-5 h-5 accent-[#1F3D36]"
              />
            </label>

            <div className="flex gap-3">
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null);
                    setForm(emptyForm);
                  }}
                  className="flex-1 rounded-full border border-[#DDE8E2] px-5 py-3 font-semibold text-[#1F3D36] hover:bg-[#F4F7F4]"
                >
                  Cancel edit
                </button>
              )}
              <button
                disabled={saving}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-[#1F3D36] px-5 py-3 font-semibold text-white hover:bg-[#152C27] disabled:opacity-60"
              >
                <UploadCloud className="w-4 h-4" />
                {saving ? "Saving..." : editingId ? "Update product" : "Add product"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1F3D36]">Product catalog</h2>
            <p className="text-sm text-slate-500">
              {filteredProducts.length} of {products.length} products shown
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                placeholder="Search products"
                className="w-full sm:w-72 rounded-full border border-[#DDE8E2] py-2.5 pl-10 pr-4 outline-none focus:border-[#1F3D36]"
              />
            </div>
            <select
              value={categoryFilter}
              onChange={(event) => setCategoryFilter(event.target.value)}
              className="rounded-full border border-[#DDE8E2] px-4 py-2.5 outline-none focus:border-[#1F3D36]"
            >
              <option value="all">All categories</option>
              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[880px]">
            <thead>
              <tr className="border-b border-[#EEF3EF] text-left text-sm text-slate-500">
                <th className="py-3 pr-4">Product</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Price</th>
                <th className="py-3 px-4">Media</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 pl-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    Loading products...
                  </td>
                </tr>
              ) : filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-8 text-center text-slate-500">
                    No products found.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((product) => (
                  <tr key={product.id} className="border-b border-[#EEF3EF] last:border-b-0">
                    <td className="py-4 pr-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image_url || "/images/placeholder.jpg"}
                          alt={product.name}
                          className="w-16 h-16 rounded-2xl object-cover bg-slate-100"
                        />
                        <div className="min-w-0">
                          <p className="font-semibold text-[#1F3D36] truncate max-w-xs">
                            {product.name}
                          </p>
                          <p className="text-xs text-slate-500">{product.slug}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-sm text-slate-600">
                      {getCategoryName(product.category_id)}
                    </td>
                    <td className="py-4 px-4 font-bold text-[#B8872F]">
                      ₹{Number(product.price || 0).toLocaleString()}
                    </td>
                    <td className="py-4 px-4">
                      <div className="flex gap-2">
                        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                          <Package className="w-3 h-3" />
                          Image
                        </span>
                        {product.video_url && (
                          <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            <Video className="w-3 h-3" />
                            Video
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-bold ${
                        product.in_stock ?? product.inStock
                          ? "bg-green-50 text-green-700"
                          : "bg-orange-50 text-orange-700"
                      }`}>
                        {product.in_stock ?? product.inStock ? "In stock" : "Made to order"}
                      </span>
                    </td>
                    <td className="py-4 pl-4">
                      <div className="flex justify-end gap-2">
                        <button
                          onClick={() => handleEdit(product)}
                          className="rounded-full border border-[#DDE8E2] p-2 text-[#1F3D36] hover:bg-[#F4F7F4]"
                          title="Edit product"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded-full border border-red-100 p-2 text-red-600 hover:bg-red-50"
                          title="Delete product"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default ProductsAdmin;
