import React from "react";
import { NavLink } from "react-router-dom";

export default function GradientButton({ children, className = "", as, to, onClick, ...rest }) {
  const base =
    "inline-flex items-center justify-center rounded-2xl px-4 py-2 font-medium text-white shadow-md shadow-blue-500/20 bg-gradient-to-r from-blue-600 to-purple-600 hover:opacity-95 active:opacity-90";

  if (as === "link" && to) {
    return (
      <NavLink to={to} className={`${base} ${className}`} {...rest}>
        {children}
      </NavLink>
    );
  }

  return (
    <button onClick={onClick} className={`${base} ${className}`} {...rest}>
      {children}
    </button>
  );
}
