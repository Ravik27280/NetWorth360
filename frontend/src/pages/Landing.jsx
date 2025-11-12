import React from "react";
import { useNavigate } from "react-router-dom";
import Card from "../components/UI/Card";
import GradientButton from "../components/UI/GradientButton";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 blur-3xl">
        <div className="h-96 w-[80rem] -translate-x-1/2 left-1/2 top-[-6rem] absolute rounded-full bg-gradient-to-r from-blue-600 to-purple-600" />
      </div>
      <div className="mx-auto max-w-7xl px-4 py-24 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight">
          Know Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">True Wealth</span>
        </h1>
        <p className="mt-4 text-lg md:text-xl opacity-80 max-w-3xl mx-auto">
          One secure dashboard for PPF, FD, EPF, ESOPs, mutual funds, stocks, bank balances and loans. Real-time sync. Privacy by design.
        </p>

        <div className="mt-8 flex items-center justify-center gap-3">
          <GradientButton onClick={() => navigate("/app")}>Start Tracking →</GradientButton>
          <button className="px-4 py-2 rounded-2xl border border-black/10 dark:border-white/20">View Demo</button>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-4">
          {["Add Assets", "Add Liabilities", "Get Insights"].map((t, i) => (
            <Card key={i} title={`0${i + 1}`}>
              <p className="text-lg font-semibold mb-2">{t}</p>
              <p className="opacity-70 text-sm">
                {i === 0 ? "Link or enter PPF, FD, MF, EPF, ESOP, stocks, bank" : i === 1 ? "Track home/car/personal loans, credit dues, EMI" : "Live net worth with trends & alerts"}
              </p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
