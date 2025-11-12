import React from "react";
import Brand from "../UI/Brand";
import GradientButton from "../UI/GradientButton";
import { NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, LogIn } from "lucide-react";

export default function Header({ dark, setDark }) {
  const navigate = useNavigate();
  const toggle = () => setDark(prev => !prev);

  return (
    <header className="sticky top-0 z-40 border-b border-black/5 dark:border-white/10 bg-white/70 dark:bg-slate-900/50 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between">
        <Brand />

        <div className="flex items-center gap-2">
          <NavLink
            to="/login"
            className="hidden md:inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 text-sm"
          >
            <LogIn className="h-4 w-4" />
            <span>Login</span>
          </NavLink>

          <button
            onClick={toggle}
            aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
            className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-900/5 dark:bg-white/10 hover:bg-slate-900/10 text-sm"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            <span className="hidden sm:inline">{dark ? "Light" : "Dark"} mode</span>
          </button>

          <GradientButton onClick={() => navigate("/app")}>Get Started</GradientButton>
        </div>
      </div>
    </header>
  );
}
