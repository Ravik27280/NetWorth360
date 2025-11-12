import React from "react";

export default function Stat({ label, value }) {
  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 p-3 bg-white/50 dark:bg-white/5 backdrop-blur-sm">
      <div className="text-xs opacity-60">{label}</div>
      <div className="text-base font-semibold">{value}</div>
    </div>
  );
}
