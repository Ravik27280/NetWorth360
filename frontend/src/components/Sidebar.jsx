import React from "react";
import { NavLink } from "react-router-dom";

const Nav = ({ to, children }) => (
  <NavLink
    to={to}
    className={({ isActive }) => `flex items-center gap-2 rounded-xl px-3 py-2 text-sm hover:bg-slate-900/5 dark:hover:bg-white/10 ${isActive ? "bg-slate-900/5 dark:bg-white/10" : ""}`}
  >
    {children}
  </NavLink>
);

export default function Sidebar() {
  return (
    <aside className="hidden md:flex md:w-64 flex-col gap-2 p-3 border-r border-black/5 dark:border-white/10">
      <Nav to="/app">Dashboard</Nav>
      <Nav to="/assets">Assets</Nav>
      <Nav to="/liabilities">Liabilities</Nav>
      <Nav to="/settings">Settings</Nav>
    </aside>
  );
}
