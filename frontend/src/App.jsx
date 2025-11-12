import React, { useState, useEffect } from "react";
import Layout from "./components/Layout/Layout";
import AppRoutes from "./routes/AppRoutes";

export default function App() {
  // Read saved preference, then fallback to system preference, then default false (light)
  const [dark, setDark] = useState(() => {
    try {
      const saved = localStorage.getItem("nw360:dark");
      if (saved === "1") return true;
      if (saved === "0") return false;
    } catch (e) {}
    // system preference fallback
    if (typeof window !== "undefined" && window.matchMedia) {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  });

  // Ensure <html> gets the .dark class (Tailwind uses .dark on an ancestor)
  useEffect(() => {
    const root = document.documentElement;
    if (dark) {
      root.classList.add("dark");
      try { localStorage.setItem("nw360:dark", "1"); } catch (e) {}
    } else {
      root.classList.remove("dark");
      try { localStorage.setItem("nw360:dark", "0"); } catch (e) {}
    }
  }, [dark]);

  return (
    <Layout setDark={setDark} dark={dark}>
      <AppRoutes />
    </Layout>
  );
}
