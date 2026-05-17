import React, { useEffect, useState } from "react";
import {
  getCategories,
  addCategory,
  updateCategory,
  deleteCategory,
  uploadCategoryImage,
} from "@/services/categories";
import { FolderOpen, ImagePlus, Pencil, Plus, Search, Trash2, UploadCloud } from "lucide-react";

const emptyForm = {
  name: "",
  slug: "",
  description: "",
  image_url: "",
  imageFile: null,
};

const generateSlug = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const CategoriesAdmin = () => {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  async function loadCategories() {
    setLoading(true);
    try {
      const data = await getCategories();
      setCategories(data || []);
    } catch (error) {
      console.error("Failed to load categories:", error);
      setStatus("Unable to load categories. Check Supabase configuration.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCategories();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleFileChange = (e) =>
    setForm({ ...form, imageFile: e.target.files?.[0] || null });

  async function handleAdd(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      let image_url = form.image_url || null;

      if (form.imageFile) {
        image_url = await uploadCategoryImage(form.imageFile);
      }

      const payload = {
        name: form.name,
        slug: form.slug || generateSlug(form.name),
        description: form.description,
        image_url,
      };

      if (editingId) {
        await updateCategory(editingId, payload);
        setStatus("Category updated successfully.");
      } else {
        await addCategory(payload);
        setStatus("Category added successfully.");
      }

      setForm(emptyForm);
      setEditingId(null);
      await loadCategories();
    } catch (err) {
      console.error("Category creation failed:", err);
      const message = err?.message || err?.error_description || "Unknown error";
      setStatus(`Failed to save category: ${message}`);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (window.confirm("Delete this category?")) {
      await deleteCategory(id);
      await loadCategories();
    }
  }

  function handleEdit(category) {
    setEditingId(category.id);
    setForm({
      name: category.name || "",
      slug: category.slug || "",
      description: category.description || "",
      image_url: category.image_url || "",
      imageFile: null,
    });
  }

  const filteredCategories = categories.filter((category) =>
    category.name?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
              Category management
            </p>
            <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">
              Create storefront collections
            </h1>
            <p className="text-slate-500 mt-2">
              Add categories with SEO-friendly slugs, descriptions, and visual collection images.
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
            New category
          </button>
        </div>

        {status && (
          <div className="mb-5 rounded-2xl bg-[#F8F1E8] px-4 py-3 text-sm font-medium text-[#1F3D36]">
            {status}
          </div>
        )}

        <form onSubmit={handleAdd} className="grid lg:grid-cols-[1fr_0.8fr] gap-6">
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <label className="space-y-2">
                <span className="text-sm font-semibold text-slate-700">Category name *</span>
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
                  placeholder="marble-ganesh-statues"
                />
              </label>
            </div>

            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-slate-700">Description</span>
              <textarea
                name="description"
                rows="5"
                className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe this collection for shoppers."
              />
            </label>
          </div>

          <div className="space-y-5">
            <div className="rounded-3xl border border-dashed border-[#BFD2C8] bg-[#F8FBF9] p-5">
              <div className="flex items-center gap-3 mb-4">
                <ImagePlus className="w-5 h-5 text-[#B8872F]" />
                <h2 className="font-bold text-[#1F3D36]">Collection image</h2>
              </div>
              <input type="file" accept="image/*" onChange={handleFileChange} className="w-full text-sm" />
              <input
                name="image_url"
                value={form.image_url}
                onChange={handleChange}
                placeholder="Or paste image URL"
                className="mt-3 w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 text-sm outline-none focus:border-[#1F3D36]"
              />
            </div>

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
                {saving ? "Saving..." : editingId ? "Update category" : "Add category"}
              </button>
            </div>
          </div>
        </form>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-[#1F3D36]">Category list</h2>
            <p className="text-sm text-slate-500">
              {filteredCategories.length} of {categories.length} categories shown
            </p>
          </div>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories"
              className="w-full sm:w-80 rounded-full border border-[#DDE8E2] py-2.5 pl-10 pr-4 outline-none focus:border-[#1F3D36]"
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {loading ? (
            <p className="text-slate-500">Loading categories...</p>
          ) : filteredCategories.length === 0 ? (
            <p className="text-slate-500">No categories found.</p>
          ) : (
            filteredCategories.map((cat) => (
              <article key={cat.id} className="rounded-3xl border border-[#DDE8E2] bg-white p-4 shadow-sm">
                <img
                  src={cat.image_url || "/images/placeholder.jpg"}
                  alt={cat.name}
                  className="w-full h-44 rounded-2xl object-cover bg-slate-100"
                />
                <div className="mt-4">
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <h3 className="font-bold text-[#1F3D36]">{cat.name}</h3>
                      <p className="text-xs text-[#B8872F]">{cat.slug}</p>
                    </div>
                    <FolderOpen className="w-5 h-5 text-[#B8872F]" />
                  </div>
                  <p className="mt-3 text-sm text-slate-500 line-clamp-2">
                    {cat.description || "No description added yet."}
                  </p>
                  <div className="mt-4 flex justify-end gap-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      className="rounded-full border border-[#DDE8E2] p-2 text-[#1F3D36] hover:bg-[#F4F7F4]"
                      title="Edit category"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(cat.id)}
                      className="rounded-full border border-red-100 p-2 text-red-600 hover:bg-red-50"
                      title="Delete category"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default CategoriesAdmin;
