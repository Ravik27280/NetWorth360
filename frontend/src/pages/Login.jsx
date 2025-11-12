import React from "react";
import Card from "../components/UI/Card";
import GradientButton from "../components/UI/GradientButton";

export default function Login() {
  return (
    <div className="mx-auto max-w-md px-4 py-16">
      <Card>
        <div className="text-center">
          <h2 className="text-2xl font-semibold">Welcome back 👋</h2>
          <p className="opacity-70 text-sm">Continue with Google or your email</p>
        </div>
        <div className="mt-6 grid gap-3">
          <GradientButton>Continue with Google</GradientButton>
          <div className="grid gap-2">
            <input placeholder="Email" className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2" />
            <input placeholder="Password" type="password" className="rounded-xl bg-white/60 dark:bg-white/5 border border-black/10 dark:border-white/10 px-3 py-2" />
          </div>
          <GradientButton>Login</GradientButton>
          <div className="text-xs opacity-60 text-center">By continuing you agree to our Terms & Privacy.</div>
        </div>
      </Card>
    </div>
  );
}
