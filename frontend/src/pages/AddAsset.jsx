import React from "react";
import Card from "../components/UI/Card";
import GradientButton from "../components/UI/GradientButton";

export default function AddAsset() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Add Asset</h2>
      <Card>
        <form className="grid gap-4 md:grid-cols-2">
          <div className="grid gap-2">
            <label className="text-sm opacity-70">Type</label>
            <select className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2">
              <option>PPF</option>
              <option>FD</option>
              <option>Mutual Fund</option>
              <option>Stocks</option>
              <option>EPF</option>
              <option>ESOP</option>
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-sm opacity-70">Value (₹)</label>
            <input type="number" className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2" placeholder="100000" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm opacity-70">Institution (optional)</label>
            <input className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2" placeholder="SBI / Zerodha / Groww" />
          </div>

          <div className="grid gap-2">
            <label className="text-sm opacity-70">Maturity (optional)</label>
            <input type="date" className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2" />
          </div>

          <div className="md:col-span-2 flex justify-end gap-2 mt-2">
            <button type="button" className="px-4 py-2 rounded-xl border border-black/10 dark:border-white/20">
              Cancel
            </button>
            <GradientButton type="submit">Save Asset</GradientButton>
          </div>
        </form>
      </Card>
    </div>
  );
}
