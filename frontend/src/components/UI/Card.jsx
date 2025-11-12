import React from "react";

export default function Card({ title, right, children, className = "" }) {
  return (
    <div className={"rounded-2xl bg-white/70 dark:bg-white/5 backdrop-blur-md border border-black/5 dark:border-white/10 shadow-sm " + className}>
      {(title || right) && (
        <div className="flex items-center justify-between px-4 pt-4">
          {title && <h3 className="text-sm font-semibold opacity-80">{title}</h3>}
          {right}
        </div>
      )}
      <div className="p-4">{children}</div>
    </div>
  );
}
