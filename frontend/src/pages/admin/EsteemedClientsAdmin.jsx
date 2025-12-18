import React, { useState, useEffect } from "react";
import {
  getClients,
  addClient,
  uploadClientLogo,
  deleteClient
} from "@/services/clients";

const EsteemedClientsAdmin = () => {
  const [clients, setClients] = useState([]);
  const [form, setForm] = useState({ name: "", testimonial: "", logo: null });

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    const logo_url = await uploadClientLogo(form.logo);

    await addClient({
      name: form.name,
      testimonial: form.testimonial,
      logo_url,
    });

    window.location.reload();
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Esteemed Clients</h1>

      <form onSubmit={handleSubmit} className="space-y-3">
        <input placeholder="Client Name" onChange={e => setForm({...form, name: e.target.value})} />
        <textarea placeholder="Testimonial" onChange={e => setForm({...form, testimonial: e.target.value})} />
        <input type="file" onChange={e => setForm({...form, logo: e.target.files[0]})} />
        <button className="bg-black text-white px-4 py-2">Add Client</button>
      </form>

      <hr className="my-6" />

      {clients.map(c => (
        <div key={c.id} className="flex items-center gap-4 mb-3">
          <img src={c.logo_url} className="w-16 h-16 object-contain" />
          <div className="flex-1">
            <p className="font-semibold">{c.name}</p>
            <p className="text-sm">{c.testimonial}</p>
          </div>
          <button onClick={() => deleteClient(c.id)} className="text-red-600">Delete</button>
        </div>
      ))}
    </div>
  );
};

export default EsteemedClientsAdmin;
