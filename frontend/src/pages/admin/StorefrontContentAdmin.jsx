import React, { useEffect, useMemo, useState } from "react";
import {
  BookOpen,
  FolderOpen,
  ImagePlus,
  Save,
  Sparkles,
  Star,
  UploadCloud,
  Users,
} from "lucide-react";
import {
  defaultStorefrontContent,
  getStorefrontContent,
  saveStorefrontContent,
  uploadStorefrontAsset,
} from "@/services/storefrontContent";
import ComingSoon from "@/components/ComingSoon";

const sectionMeta = {
  bestseller: {
    title: "Bestseller hero",
    eyebrow: "Homepage",
    description: "Change the featured bestseller image and hero product card on the dashboard/homepage.",
    icon: Star,
  },
  collections: {
    title: "Collections",
    eyebrow: "Storefront",
    description: "Manage curated collection cards and links for shopping sections.",
    icon: FolderOpen,
  },
  "god-statues": {
    title: "God Statues",
    eyebrow: "Landing page",
    description: "Manage the God Statue page headline and custom-order messaging.",
    icon: Sparkles,
  },
  "client-diary": {
    title: "Client Diary",
    eyebrow: "Testimonials",
    description: "Manage client diary page title and description.",
    icon: Users,
  },
  blog: {
    title: "Blog",
    eyebrow: "Content",
    description: "Create and manage blog cards shown on the public blog page.",
    icon: BookOpen,
  },
};

const blankCollection = () => ({
  id: `collection-${Date.now()}`,
  title: "",
  description: "",
  imageUrl: "",
  href: "/collections/",
  enabled: true,
});

const blankPost = () => ({
  id: `blog-${Date.now()}`,
  title: "",
  excerpt: "",
  imageUrl: "",
  href: "/blog/",
  publishedAt: new Date().toISOString().slice(0, 10),
  enabled: true,
});

const TextField = ({ label, value, onChange, placeholder, type = "text" }) => (
  <label className="space-y-2 block">
    <span className="text-sm font-semibold text-slate-700">{label}</span>
    <input
      type={type}
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
    />
  </label>
);

const TextArea = ({ label, value, onChange, placeholder }) => (
  <label className="space-y-2 block">
    <span className="text-sm font-semibold text-slate-700">{label}</span>
    <textarea
      value={value || ""}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rows="4"
      className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
    />
  </label>
);

const StorefrontContentAdmin = ({ section = "bestseller" }) => {
  const [content, setContent] = useState(defaultStorefrontContent);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  const meta = sectionMeta[section] || sectionMeta.bestseller;
  const Icon = meta.icon;

  useEffect(() => {
    async function load() {
      setLoading(true);
      const data = await getStorefrontContent();
      setContent(data);
      setLoading(false);
    }
    load();
  }, []);

  const enabledCollections = useMemo(
    () => content.collections?.filter((item) => item.enabled).length || 0,
    [content.collections],
  );

  const enabledPosts = useMemo(
    () => content.blogPosts?.filter((item) => item.enabled).length || 0,
    [content.blogPosts],
  );

  const updateContent = (updates) => {
    setContent((current) => ({ ...current, ...updates }));
  };

  const updateNested = (key, updates) => {
    setContent((current) => ({
      ...current,
      [key]: {
        ...current[key],
        ...updates,
      },
    }));
  };

  const updateListItem = (key, index, updates) => {
    setContent((current) => ({
      ...current,
      [key]: current[key].map((item, itemIndex) =>
        itemIndex === index ? { ...item, ...updates } : item,
      ),
    }));
  };

  const removeListItem = (key, index) => {
    setContent((current) => ({
      ...current,
      [key]: current[key].filter((_, itemIndex) => itemIndex !== index),
    }));
  };

  const uploadImage = async (callback, file) => {
    if (!file) return;
    setStatus("Uploading image...");
    try {
      const url = await uploadStorefrontAsset(file);
      callback(url);
      setStatus("Image uploaded. Save changes to publish.");
    } catch (error) {
      setStatus(error?.message || "Image upload failed.");
    }
  };

  const handleSave = async () => {
    setSaving(true);
    setStatus("");
    const result = await saveStorefrontContent(content);
    setSaving(false);
    if (result.savedRemotely) {
      setStatus("Saved and published to Supabase.");
    } else {
      if (!result.error) {
        setStatus("Saved locally. Configure Supabase to publish for all visitors.");
        return;
      }

      if (result.reason === "missing_table") {
        setStatus(
          "Saved locally. Supabase table `storefront_content` was not found — run `frontend/SUPABASE_SETUP.sql`.",
        );
        return;
      }

      if (result.reason === "permission_denied") {
        setStatus(
          "Saved locally. Supabase denied write access to `storefront_content` (check RLS policy for authenticated/admin users).",
        );
        return;
      }

      setStatus(`Saved locally. Supabase sync failed: ${result.error.message || "Unknown error"}`);
    }
  };

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex items-start gap-4">
            <div className="rounded-2xl bg-[#F8F1E8] p-4 text-[#B8872F]">
              <Icon className="w-7 h-7" />
            </div>
            <div>
              <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
                {meta.eyebrow}
              </p>
              <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">{meta.title}</h1>
              <p className="text-slate-500 mt-2 max-w-3xl">{meta.description}</p>
            </div>
          </div>
          <button
            onClick={handleSave}
            disabled={saving || loading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-[#1F3D36] px-6 py-3 font-semibold text-white hover:bg-[#152C27] disabled:opacity-60"
          >
            {saving ? <UploadCloud className="w-4 h-4 animate-pulse" /> : <Save className="w-4 h-4" />}
            {saving ? "Saving..." : "Save changes"}
          </button>
        </div>

        {status && (
          <div className="mt-5 rounded-2xl bg-[#F8F1E8] px-4 py-3 text-sm font-medium text-[#1F3D36]">
            {status}
          </div>
        )}
      </section>

      {loading ? (
        <section className="rounded-[2rem] bg-white p-8 text-slate-500 border border-[#DDE8E2]">
          Loading content...
        </section>
      ) : (
        <>
          {section === "bestseller" && (
            <section className="grid lg:grid-cols-[1fr_0.8fr] gap-6">
              <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2] space-y-5">
                <TextField
                  label="Product title"
                  value={content.bestseller.title}
                  onChange={(value) => updateNested("bestseller", { title: value })}
                  placeholder="White Marble Ganesh Statue"
                />
                <TextField
                  label="Subtitle"
                  value={content.bestseller.subtitle}
                  onChange={(value) => updateNested("bestseller", { subtitle: value })}
                  placeholder="Ready for inquiry"
                />
                <TextField
                  label="CTA label"
                  value={content.bestseller.ctaLabel}
                  onChange={(value) => updateNested("bestseller", { ctaLabel: value })}
                  placeholder="View"
                />
                <TextField
                  label="CTA link"
                  value={content.bestseller.ctaHref}
                  onChange={(value) => updateNested("bestseller", { ctaHref: value })}
                  placeholder="/god-statue"
                />
                <TextField
                  label="Image URL"
                  value={content.bestseller.imageUrl}
                  onChange={(value) => updateNested("bestseller", { imageUrl: value })}
                  placeholder="/images/products/ganesh-new-top.png"
                />
                <div className="rounded-3xl border border-dashed border-[#BFD2C8] bg-[#F8FBF9] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <ImagePlus className="w-5 h-5 text-[#B8872F]" />
                    <h2 className="font-bold text-[#1F3D36]">Upload bestseller image</h2>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(event) =>
                      uploadImage(
                        (url) => updateNested("bestseller", { imageUrl: url }),
                        event.target.files?.[0],
                      )
                    }
                  />
                </div>
              </div>

              <div className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
                <p className="text-sm font-bold uppercase tracking-[0.2em] text-[#B8872F] mb-4">
                  Preview
                </p>
                <div className="rounded-[2rem] border border-[#E8D9C5] bg-[#F8F1E8] p-5">
                  <img
                    src={content.bestseller.imageUrl}
                    alt={content.bestseller.title}
                    className="w-full h-80 object-contain rounded-2xl bg-white"
                  />
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#B8872F]">
                    {content.bestseller.subtitle}
                  </p>
                  <h2 className="text-xl font-bold text-[#1F3D36]">{content.bestseller.title}</h2>
                </div>
              </div>
            </section>
          )}

          {section === "collections" && (
            <ArrayEditor
              title={`${enabledCollections} enabled collection cards`}
              items={content.collections}
              itemType="collection"
              onAdd={() => updateContent({ collections: [...content.collections, blankCollection()] })}
              onRemove={(index) => removeListItem("collections", index)}
              onUpdate={(index, updates) => updateListItem("collections", index, updates)}
              onUpload={(index, file) =>
                uploadImage((url) => updateListItem("collections", index, { imageUrl: url }), file)
              }
            />
          )}

          {section === "god-statues" && (
            <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2] space-y-5">
              <TextField
                label="Page title"
                value={content.godStatues.title}
                onChange={(value) => updateNested("godStatues", { title: value })}
              />
              <TextArea
                label="Page description"
                value={content.godStatues.description}
                onChange={(value) => updateNested("godStatues", { description: value })}
              />
              <TextField
                label="Custom CTA title"
                value={content.godStatues.ctaTitle}
                onChange={(value) => updateNested("godStatues", { ctaTitle: value })}
              />
              <TextArea
                label="Custom CTA description"
                value={content.godStatues.ctaDescription}
                onChange={(value) => updateNested("godStatues", { ctaDescription: value })}
              />
            </section>
          )}

          {section === "client-diary" && (
            <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2] space-y-5">
              <TextField
                label="Page title"
                value={content.clientDiary.title}
                onChange={(value) => updateNested("clientDiary", { title: value })}
              />
              <TextArea
                label="Page description"
                value={content.clientDiary.description}
                onChange={(value) => updateNested("clientDiary", { description: value })}
              />
              <p className="rounded-2xl bg-[#F8F1E8] p-4 text-sm text-[#1F3D36]">
                Individual client testimonials and logos are managed under the existing Clients and Reviews admin tabs.
              </p>
            </section>
          )}

          {section === "blog" && (
            <ArrayEditor
              title={`${enabledPosts} enabled blog posts`}
              items={content.blogPosts}
              itemType="blog"
              onAdd={() => updateContent({ blogPosts: [...content.blogPosts, blankPost()] })}
              onRemove={(index) => removeListItem("blogPosts", index)}
              onUpdate={(index, updates) => updateListItem("blogPosts", index, updates)}
              onUpload={(index, file) =>
                uploadImage((url) => updateListItem("blogPosts", index, { imageUrl: url }), file)
              }
            />
          )}
        </>
      )}
    </div>
  );
};

const ArrayEditor = ({ title, items, itemType, onAdd, onRemove, onUpdate, onUpload }) => (
  <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
    <div className="flex items-center justify-between gap-4 mb-6">
      <div>
        <h2 className="text-2xl font-bold text-[#1F3D36]">{title}</h2>
        <p className="text-sm text-slate-500">Add, edit, disable, or delete storefront cards.</p>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full bg-[#1F3D36] px-5 py-3 text-sm font-semibold text-white hover:bg-[#152C27]"
      >
        Add item
      </button>
    </div>

    <div className="grid lg:grid-cols-2 gap-5">
      {items.length === 0 ? (
        <div className="lg:col-span-2">
          <ComingSoon
            title={`${itemType === "blog" ? "Blog posts" : "Collection cards"} coming soon`}
            description="Use the Add item button above to create the first item for this dashboard section."
            className="bg-[#F8FBF9]"
          />
        </div>
      ) : items.map((item, index) => (
        <article key={item.id || index} className="rounded-3xl border border-[#DDE8E2] p-5 space-y-4">
          <div className="flex items-start justify-between gap-4">
            <h3 className="font-bold text-[#1F3D36]">
              {item.title || `Untitled ${itemType}`}
            </h3>
            <label className="flex items-center gap-2 text-sm font-semibold text-slate-600">
              <input
                type="checkbox"
                checked={item.enabled !== false}
                onChange={(event) => onUpdate(index, { enabled: event.target.checked })}
                className="accent-[#1F3D36]"
              />
              Enabled
            </label>
          </div>

          <TextField
            label="Title"
            value={item.title}
            onChange={(value) => onUpdate(index, { title: value })}
          />
          <TextArea
            label={itemType === "blog" ? "Excerpt" : "Description"}
            value={itemType === "blog" ? item.excerpt : item.description}
            onChange={(value) =>
              onUpdate(index, itemType === "blog" ? { excerpt: value } : { description: value })
            }
          />
          <div className="grid md:grid-cols-2 gap-4">
            <TextField
              label="Image URL"
              value={item.imageUrl}
              onChange={(value) => onUpdate(index, { imageUrl: value })}
            />
            <TextField
              label="Link"
              value={item.href}
              onChange={(value) => onUpdate(index, { href: value })}
            />
          </div>
          {itemType === "blog" && (
            <TextField
              label="Published date"
              type="date"
              value={item.publishedAt}
              onChange={(value) => onUpdate(index, { publishedAt: value })}
            />
          )}

          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <input
              type="file"
              accept="image/*"
              onChange={(event) => onUpload(index, event.target.files?.[0])}
              className="text-sm"
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
            >
              Delete
            </button>
          </div>
        </article>
      ))}
    </div>
  </section>
);

export default StorefrontContentAdmin;
