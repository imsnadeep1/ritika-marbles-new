import React, { useState, useEffect } from "react";
import { Building2, ImagePlus, Plus, Trash2, UploadCloud } from "lucide-react";
import {
  getClients,
  addClient,
  uploadClientLogo,
  deleteClient
} from "@/services/clients";

const EsteemedClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", testimonial: "", logo: null });
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState("");

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setStatus("");

    try {
      const logo_url = form.logo ? await uploadClientLogo(form.logo) : null;

      await addClient({
        name: form.name,
        testimonial: form.testimonial,
        logo_url,
      });

      const updated = await getClients();
      setClients(updated || []);
      setForm({ name: "", testimonial: "", logo: null });
      setStatus("Client story added successfully.");
    } catch (error) {
      console.error("Failed to save client:", error);
      setStatus(error?.message || "Failed to save client.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this client entry?")) return;
    await deleteClient(id);
    const updated = await getClients();
    setClients(updated || []);
  }

  return (
    <div className="space-y-8">
      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.2em]">
              Social proof
            </p>
            <h1 className="text-3xl font-bold text-[#1F3D36] mt-2">
              Esteemed clients and testimonials
            </h1>
            <p className="text-slate-500 mt-2">
              Manage client logos and short testimonials shown in your storefront experience.
            </p>
          </div>
          <Building2 className="w-10 h-10 text-[#B8872F]" />
        </div>

        {status && (
          <div className="mb-5 rounded-2xl bg-[#F8F1E8] px-4 py-3 text-sm font-medium text-[#1F3D36]">
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-[1fr_0.7fr] gap-5">
          <div className="space-y-4">
            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-slate-700">Client name *</span>
              <input
                value={form.name}
                placeholder="Client / temple / architect name"
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                required
              />
            </label>
            <label className="space-y-2 block">
              <span className="text-sm font-semibold text-slate-700">Testimonial</span>
              <textarea
                value={form.testimonial}
                placeholder="Short client story or note"
                onChange={(e) => setForm({ ...form, testimonial: e.target.value })}
                className="w-full rounded-2xl border border-[#DDE8E2] px-4 py-3 outline-none focus:border-[#1F3D36]"
                rows="4"
              />
            </label>
          </div>
          <div className="space-y-4">
            <div className="rounded-3xl border border-dashed border-[#BFD2C8] bg-[#F8FBF9] p-5">
              <div className="flex items-center gap-3 mb-4">
                <ImagePlus className="w-5 h-5 text-[#B8872F]" />
                <h2 className="font-bold text-[#1F3D36]">Client logo</h2>
              </div>
              <input type="file" accept="image/*" onChange={e => setForm({...form, logo: e.target.files[0]})} />
            </div>
            <button
              disabled={saving}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-[#1F3D36] px-5 py-3 font-semibold text-white hover:bg-[#152C27] disabled:opacity-60"
            >
              {saving ? <UploadCloud className="w-4 h-4 animate-pulse" /> : <Plus className="w-4 h-4" />}
              {saving ? "Saving..." : "Add client"}
            </button>
          </div>
        </form>
      </section>

      <section className="rounded-[2rem] bg-white p-6 shadow-sm border border-[#DDE8E2]">
        <h2 className="text-2xl font-bold text-[#1F3D36] mb-5">Client entries</h2>
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
          {clients.length === 0 ? (
            <p className="text-slate-500">No clients added yet.</p>
          ) : (
            clients.map(c => (
              <article key={c.id} className="rounded-3xl border border-[#DDE8E2] p-5">
                <img src={c.logo_url || "/logo.svg"} alt={c.name} className="w-20 h-20 object-contain rounded-2xl bg-[#F8FBF9] p-2" />
                <p className="font-bold text-[#1F3D36] mt-4">{c.name}</p>
                <p className="text-sm text-slate-500 mt-2 line-clamp-3">{c.testimonial}</p>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="mt-4 inline-flex items-center gap-1 rounded-full bg-red-50 px-3 py-2 text-sm font-semibold text-red-700 hover:bg-red-100"
                >
                  <Trash2 className="w-4 h-4" />
                  Delete
                </button>
              </article>
            ))
          )}
        </div>
      </section>
    </div>
  );
};

export default EsteemedClientsAdmin;
