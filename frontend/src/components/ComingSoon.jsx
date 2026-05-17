import React from "react";
import { Sparkles } from "lucide-react";

const ComingSoon = ({
  title = "Coming soon",
  description = "New content is being prepared and will be available shortly.",
  className = "",
}) => {
  return (
    <div className={`rounded-[2rem] border border-[#E8D9C5] bg-white p-8 text-center shadow-sm ${className}`}>
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-[#F8F1E8] text-[#B8872F]">
        <Sparkles className="h-7 w-7" />
      </div>
      <h2 className="text-2xl font-bold text-[#1F3D36]">{title}</h2>
      <p className="mx-auto mt-3 max-w-xl text-slate-500">{description}</p>
    </div>
  );
};

export default ComingSoon;
