import React from "react";

export default function DropCap({ children }: { children: React.ReactNode }) {
  return (
    <div className="prose prose-lg md:prose-xl max-w-none font-body leading-relaxed text-[#1a1a18] drop-cap">
      {children}
    </div>
  );
}
