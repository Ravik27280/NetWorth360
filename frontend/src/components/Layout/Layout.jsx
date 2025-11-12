import React from "react";
import Header from "./Header";

export default function Layout({ children, dark, setDark }) {
  // NOTE: do NOT add className={dark ? 'dark' : ''} here.
  // Tailwind should check <html>.dark only to avoid nested/contradictory classes.
  return (
    <div>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
        <Header dark={dark} setDark={setDark} />
        <main>{children}</main>
        <footer className="mt-20 border-t border-black/5 dark:border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-8 text-sm opacity-70 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">🔒 End-to-end encrypted • Real-time sync</div>
            <div className="space-x-4">
              <a href="#">Privacy</a>
              <a href="#">Terms</a>
              <a href="#">Security</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
