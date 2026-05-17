import React, { useEffect, useState } from "react";
import { getClients } from "@/services/clients";
import ComingSoon from "@/components/ComingSoon";

const EsteemedClients = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    getClients().then(setClients);
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <p className="text-[#B8872F] text-sm font-bold uppercase tracking-[0.25em] mb-3">
          Trusted by
        </p>
        <h2 className="text-3xl md:text-4xl font-bold text-[#1F3D36] mb-4">
          Our Esteemed Clients
        </h2>
        <p className="text-slate-600 max-w-2xl mx-auto mb-12">
          Projects and partners who trusted our marble craftsmanship.
        </p>

        {clients.length === 0 ? (
          <ComingSoon
            title="Client logos coming soon"
            description="Esteemed client logos and testimonials will appear here once added from the admin dashboard."
          />
        ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {clients.map((c) => (
            <div
              key={c.id}
              className="bg-[#F8FBF9] border border-[#DDE8E2] rounded-[1.5rem] p-6 flex items-center justify-center hover:-translate-y-1 hover:shadow-xl transition-all"
            >
              <img
                src={c.logo_url}
                alt={c.name}
                className="max-h-14 object-contain grayscale hover:grayscale-0 transition"
              />
            </div>
          ))}
        </div>
        )}
      </div>
    </section>
  );
};

export default EsteemedClients;
