import React from "react";
import { Routes, Route } from "react-router-dom";
import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Assets from "../pages/Assets";
import Liabilities from "../pages/Liabilities";
import AddAsset from "../pages/AddAsset";
import AddLiability from "../pages/AddLiability";
import Settings from "../pages/Settings";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/app/*" element={<Dashboard />} /> {/* Dashboard includes nested routing via links */}
      <Route path="/assets" element={<Assets />} />
      <Route path="/liabilities" element={<Liabilities />} />
      <Route path="/add-asset" element={<AddAsset />} />
      <Route path="/add-liability" element={<AddLiability />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
}
