import React, { useEffect, useState } from "react";
import { getClients } from "@/services/clients";

const EsteemedClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-[#7B2D3A] mb-10">
          Our Esteemed Clients
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
          {clients.map(c => (
            <img key={c.id} src={c.logo_url} alt={c.name} className="max-h-20 mx-auto" />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EsteemedClients;
