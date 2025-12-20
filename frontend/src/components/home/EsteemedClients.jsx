import React, { useEffect, useState } from "react";
import { getClients } from "@/services/clients";

const EsteemedClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1a5d4c] mb-12">
          Our Esteemed Clients
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-gray-50 border border-gray-100 rounded-xl p-6 flex items-center justify-center hover:shadow transition"
            >
              <img
                src={c.logo_url}
                alt={c.name}
                className="max-h-14 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EsteemedClients;
