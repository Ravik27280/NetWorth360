import React from "react";
import Sidebar from "../components/Sidebar";
import NetWorthChart from "../charts/NetWorthChart";
import AssetsPie from "../charts/AssetsPie";
import LiabilitiesBar from "../charts/LiabilitiesBar";
import Card from "../components/UI/Card";
import Stat from "../components/Stat";
import GradientButton from "../components/UI/GradientButton";

const demoNetWorth = [
  { month: "Apr", value: 72 },
  { month: "May", value: 75 },
  { month: "Jun", value: 79 },
  { month: "Jul", value: 81 },
  { month: "Aug", value: 83 },
  { month: "Sep", value: 86 },
  { month: "Oct", value: 88 },
  { month: "Nov", value: 92 },
];

const demoAssets = [
  { name: "Mutual Funds", value: 34 },
  { name: "Stocks", value: 28 },
  { name: "EPF/PPF", value: 22 },
  { name: "FD/Bank", value: 9 },
  { name: "ESOPs", value: 7 },
];

const demoLiabilities = [
  { name: "Home", value: 12 },
  { name: "Car", value: 3 },
  { name: "Credit", value: 1.2 },
  { name: "Personal", value: 1.8 },
];

export default function Dashboard() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid md:grid-cols-[16rem,1fr] gap-4">
        <Sidebar />
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-semibold">Hi Ravi 👋</h2>
              <p className="opacity-70 text-sm">Here's your real-time net worth snapshot</p>
            </div>
            <GradientButton className="hidden md:inline-flex">Add Asset</GradientButton>
          </div>

          <div className="grid lg:grid-cols-3 gap-4">
            <Card className="lg:col-span-2" title="Net Worth" right={<span className="text-xs opacity-60">INR • last 8 months</span>}>
              <NetWorthChart data={demoNetWorth} />
            </Card>

            <Card title="This Month" className="lg:col-span-1">
              <div className="grid grid-cols-2 gap-3 text-sm">
                <Stat label="Assets" value="₹1,05,00,000" />
                <Stat label="Liabilities" value="₹17,54,800" />
                <Stat label="Change" value="▲ +7.2%" />
                <Stat label="Runway" value="> 5 yrs" />
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mt-4">
            <Card title="Assets (breakdown)" right={<span className="text-xs opacity-60">Demo</span>}>
              <AssetsPie data={demoAssets} />
            </Card>
            <Card title="Liabilities (EMI)" right={<span className="text-xs opacity-60">Demo</span>}>
              <LiabilitiesBar data={demoLiabilities} />
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
