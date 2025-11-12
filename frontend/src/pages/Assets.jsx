import React, { useMemo } from "react";
import Card from "../components/UI/Card";
import GradientButton from "../components/UI/GradientButton";

export default function Assets() {
  const rows = [
    { type: "PPF", value: 850000, institution: "SBI", maturity: "2035-03-31" },
    { type: "FD", value: 250000, institution: "HDFC", maturity: "2026-11-10" },
    { type: "Mutual Fund", value: 3400000, institution: "Groww", maturity: "-" },
    { type: "Stocks", value: 2800000, institution: "Zerodha", maturity: "-" },
    { type: "ESOPs", value: 700000, institution: "Company", maturity: "-" },
  ];
  const total = useMemo(() => rows.reduce((s, r) => s + r.value, 0), [rows]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-semibold">Assets</h2>
        <GradientButton>Add Asset</GradientButton>
      </div>
      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="text-left opacity-70">
              <tr>
                <th className="py-2">Type</th>
                <th className="py-2">Institution</th>
                <th className="py-2">Value (₹)</th>
                <th className="py-2">Maturity</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-t border-black/5 dark:border-white/10">
                  <td className="py-3">{r.type}</td>
                  <td className="py-3">{r.institution}</td>
                  <td className="py-3">{r.value.toLocaleString("en-IN")}</td>
                  <td className="py-3">{r.maturity}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-black/5 dark:border-white/10 font-semibold">
                <td className="py-3" colSpan={2}>
                  Total
                </td>
                <td className="py-3">₹ {total.toLocaleString("en-IN")}</td>
                <td></td>
              </tr>
            </tfoot>
          </table>
        </div>
      </Card>
    </div>
  );
}
