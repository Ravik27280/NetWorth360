import React from "react";
import Card from "../components/UI/Card";
import GradientButton from "../components/UI/GradientButton";

export default function Settings() {
  const integrations = [
    { name: "Bank (AA)" },
    { name: "Broker (Zerodha)" },
    { name: "MF (CAMs/KFin)" },
    { name: "EPF/PPF" },
  ];

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <h2 className="text-2xl font-semibold mb-4">Settings</h2>
      <Card title="Integrations">
        <div className="grid md:grid-cols-2 gap-3">
          {integrations.map((i) => (
            <div key={i.name} className="rounded-xl border border-black/5 dark:border-white/10 p-3 flex items-center justify-between">
              <div>
                <div className="font-medium">{i.name}</div>
                <div className="text-xs opacity-60">Connect securely to sync</div>
              </div>
              <GradientButton>Connect</GradientButton>
            </div>
          ))}
        </div>
      </Card>

      <Card className="mt-4" title="Security">
        <div className="flex items-center justify-between">
          <span className="text-sm opacity-80">Two-factor authentication (2FA)</span>
          <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked />
            <div className="w-12 h-7 bg-slate-300 peer-checked:bg-purple-600 rounded-full relative after:content-[''] after:absolute after:top-1 after:left-1 after:w-5 after:h-5 after:bg-white after:rounded-full after:transition-all peer-checked:after:translate-x-5" />
          </label>
        </div>
      </Card>
    </div>
  );
}
